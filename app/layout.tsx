import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ShareText - Share text online instantly',
  description: 'Share text snippets instantly with unique URLs. Simple, fast, and free text sharing.',
  keywords: 'share text, text sharing, paste, snippet, code sharing',
  openGraph: {
    title: 'ShareText - Share text online instantly',
    description: 'Share text snippets instantly with unique URLs. Simple, fast, and free text sharing.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Noise overlay for texture */}
        <div className="noise-overlay" />
        
        {/* Background gradient orbs */}
        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />
        
        {/* Grid pattern background */}
        <div className="fixed inset-0 grid-pattern pointer-events-none" />
        
        {/* Main content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
