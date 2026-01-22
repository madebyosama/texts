import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';

// Generate a unique slug
function generateSlug(): string {
  return nanoid(8); // 8 character unique ID
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, deletePassword } = body;

    // Validation
    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    if (!deletePassword || typeof deletePassword !== 'string') {
      return NextResponse.json(
        { error: 'Delete password is required' },
        { status: 400 }
      );
    }

    if (content.length > 500000) { // 500KB limit
      return NextResponse.json(
        { error: 'Content is too large (max 500KB)' },
        { status: 400 }
      );
    }

    if (deletePassword.length < 3) {
      return NextResponse.json(
        { error: 'Password must be at least 3 characters' },
        { status: 400 }
      );
    }

    // Generate unique slug
    let slug = generateSlug();
    let attempts = 0;
    const maxAttempts = 5;

    // Check for slug collision
    while (attempts < maxAttempts) {
      const { data: existing } = await supabase
        .from('texts')
        .select('slug')
        .eq('slug', slug)
        .single();

      if (!existing) break;
      
      slug = generateSlug();
      attempts++;
    }

    if (attempts >= maxAttempts) {
      return NextResponse.json(
        { error: 'Could not generate unique URL. Please try again.' },
        { status: 500 }
      );
    }

    // Hash the delete password
    const passwordHash = await bcrypt.hash(deletePassword, 10);

    // Insert into database
    const { data, error } = await supabase
      .from('texts')
      .insert([
        {
          slug,
          content,
          delete_password_hash: passwordHash,
          views: 0,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save text' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      slug: data.slug,
      createdAt: data.created_at,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
