import React from "react"
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { TermsAcceptanceModal } from '@/components/terms-acceptance-modal'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${GeistSans.variable} font-sans antialiased`}>
        {children}
        <TermsAcceptanceModal />
        <Analytics />
      </body>
    </html>
  )
}
