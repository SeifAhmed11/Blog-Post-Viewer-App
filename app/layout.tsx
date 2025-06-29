import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Blog | Discover Amazing Content',
  description: 'A beautiful blog platform featuring quality content, insights, and stories from talented writers.',
  keywords: ['blog', 'articles', 'writing', 'content', 'stories'],
  authors: [{ name: 'The Blog Team' }],
  openGraph: {
    title: 'The Blog',
    description: 'Discover amazing stories, insights, and ideas from our community of writers.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Blog',
    description: 'Discover amazing stories, insights, and ideas from our community of writers.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}