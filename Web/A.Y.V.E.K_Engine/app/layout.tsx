import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Analytics } from '@vercel/analytics/next'
import { Suspense } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'A.Y.V.E.K. — AI Image Generation',
  description: 'Premium AI-powered image generation with cutting-edge models',
  generator: 'v0.app',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} font-sans antialiased`}>
        <Suspense fallback={null}>
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
