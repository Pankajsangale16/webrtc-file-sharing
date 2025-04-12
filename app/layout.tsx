import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Background from '@/components/background'
import Preloader from '@/components/preloader'

export const metadata: Metadata = {
  title: 'WebRTC File Sharing',
  description: 'Fast and secure file sharing using WebRTC technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Preloader />
          <Background />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
