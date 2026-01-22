import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

// GET - Fetch a text by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const slug = params.id;

    const { data, error } = await supabase
      .from('texts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Text not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await supabase
      .from('texts')
      .update({ views: (data.views || 0) + 1 })
      .eq('slug', slug);

    return NextResponse.json({
      slug: data.slug,
      content: data.content,
      createdAt: data.created_at,
      views: (data.views || 0) + 1,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a text with password verification
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const slug = params.id;
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    // Fetch the text to verify password
    const { data, error } = await supabase
      .from('texts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Text not found' },
        { status: 404 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, data.delete_password_hash);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Incorrect password' },
        { status: 403 }
      );
    }

    // Delete the text
    const { error: deleteError } = await supabase
      .from('texts')
      .delete()
      .eq('slug', slug);

    if (deleteError) {
      console.error('Delete error:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete text' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Text deleted successfully',
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
