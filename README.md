# ShareText Clone

A beautiful, modern text sharing application built with **Next.js 14**, **Supabase**, and **Tailwind CSS**. Share text snippets instantly with unique URLs and delete them anytime with a password.

![ShareText Preview](https://via.placeholder.com/800x400/0a0a0b/00d4aa?text=ShareText)

## ✨ Features

- **🚀 Instant Sharing** - Paste your text and get a unique URL in seconds
- **🔒 Password Protected Deletion** - Only you can delete your text with your secret password
- **♾️ Forever Storage** - Your text stays online until you decide to delete it
- **📊 View Counter** - Track how many times your text has been viewed
- **📱 Responsive Design** - Works beautifully on desktop, tablet, and mobile
- **🎨 Modern UI** - Sleek dark theme with stunning animations and effects
- **⚡ Fast** - Built on Next.js with optimized performance
- **🔐 No Login Required** - Start sharing immediately without creating an account

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript
- **Unique IDs**: nanoid
- **Password Hashing**: bcryptjs

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works fine)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd sharetext
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Go to [Supabase](https://supabase.com/) and create a new project
2. Wait for the database to be ready
3. Go to **SQL Editor** in the Supabase dashboard
4. Copy the contents of `supabase-schema.sql` and run it
5. Go to **Settings** → **API** and copy your project URL and anon key

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/) and import your repository
3. Add environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- Render
- DigitalOcean App Platform

## 📁 Project Structure

```
sharetext/
├── app/
│   ├── api/
│   │   └── texts/
│   │       ├── route.ts          # POST: Create new text
│   │       └── [id]/
│   │           └── route.ts      # GET: Fetch text, DELETE: Delete text
│   ├── [id]/
│   │   └── page.tsx              # View shared text page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── lib/
│   └── supabase.ts               # Supabase client
├── supabase-schema.sql           # Database schema
├── package.json
├── tailwind.config.js
└── README.md
```

## 🔒 Security

- Passwords are hashed using bcrypt before storage
- Delete operations require password verification
- Row Level Security (RLS) is enabled on the database
- No sensitive data is exposed to the client

## 🎨 Customization

### Colors

Edit the color palette in `tailwind.config.js`:

```javascript
colors: {
  'accent': {
    primary: '#00d4aa',    // Main accent color
    secondary: '#00b894',  // Secondary accent
    glow: '#00ffcc',       // Glow effect color
  },
  // ...
}
```

### Fonts

The app uses:
- **Instrument Sans** - For display text
- **JetBrains Mono** - For code/monospace text

Change fonts in `app/globals.css` by updating the Google Fonts imports.

## 📝 API Reference

### Create Text
```
POST /api/texts
Content-Type: application/json

{
  "content": "Your text here",
  "deletePassword": "your-secret-password"
}

Response:
{
  "success": true,
  "slug": "abc123xy",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Get Text
```
GET /api/texts/{slug}

Response:
{
  "slug": "abc123xy",
  "content": "Your text here",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "views": 42
}
```

### Delete Text
```
DELETE /api/texts/{slug}
Content-Type: application/json

{
  "password": "your-secret-password"
}

Response:
{
  "success": true,
  "message": "Text deleted successfully"
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Credits

Inspired by [sharetext.io](https://sharetext.io/)

---

Made with ❤️ using Next.js, Supabase, and Tailwind CSS
