"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 animate-in-fade" style={{ animationDelay: '0.1s' }}>
      <div className="w-full max-w-5xl backdrop-blur-3xl bg-black/40 border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <Link href="/" className="text-xl font-bold tracking-tight text-white flex items-center gap-2" key="logo">
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60" style={{ fontFamily: 'var(--font-inter)' }}>A.Y.V.E.K</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link href="/signin">
            <Button variant="ghost" className="text-neutral-400 hover:text-white hover:bg-white/5 rounded-full px-5 text-sm font-medium transition-colors">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="relative group overflow-hidden bg-white text-black hover:bg-white rounded-full px-6 text-sm font-medium transition-all duration-300 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
              <span className="relative z-10">Sign up</span>
              {/* Aura Effect */}
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
