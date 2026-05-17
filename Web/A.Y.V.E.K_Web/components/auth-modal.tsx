"use client"

import { useState, useEffect } from "react"
import { X, Github } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { motion, AnimatePresence } from "framer-motion"

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
    initialView?: 'signin' | 'signup'
}

// Google Icon
const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
)

export function AuthModal({ isOpen, onClose, initialView = 'signin' }: AuthModalProps) {
    const [view, setView] = useState<'signin' | 'signup'>(initialView)

    const handleLogin = async (provider: 'github' | 'google') => {
        const supabase = createClient()
        await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
    }

    useEffect(() => {
        setView(initialView)
    }, [initialView])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-md mx-4 overflow-hidden bg-black/80 border border-white/10 rounded-3xl shadow-[0_0_50px_-10px_rgba(255,255,255,0.1)]"
                    >

                        {/* Decorative Gradients */}
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                        {/* Content */}
                        <div className="relative p-8 md:p-10">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Header */}
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold tracking-tight text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                                    {view === 'signin' ? 'Welcome Back' : 'Create Account'}
                                </h2>
                                <p className="text-white/50 text-sm">
                                    {view === 'signin' ? 'Sign in to access your workspace' : 'Join the revolution of AI imagery'}
                                </p>
                            </div>

                            {/* OAuth Buttons */}
                            <div className="space-y-3">
                                <button
                                    onClick={() => handleLogin('github')}
                                    className="w-full h-12 flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white font-medium transition-all"
                                >
                                    <Github className="w-5 h-5" />
                                    <span>Continue with GitHub</span>
                                </button>
                                <button
                                    onClick={() => handleLogin('google')}
                                    className="w-full h-12 flex items-center justify-center gap-3 bg-white hover:bg-neutral-200 rounded-xl text-black font-medium transition-all"
                                >
                                    <GoogleIcon />
                                    <span>Continue with Google</span>
                                </button>
                            </div>

                            {/* Footer */}
                            <div className="mt-8 text-center text-sm">
                                <span className="text-white/40">
                                    {view === 'signin' ? "Don't have an account? " : "Already have an account? "}
                                </span>
                                <button
                                    onClick={() => setView(view === 'signin' ? 'signup' : 'signin')}
                                    className="text-white hover:text-amber-400 font-medium transition-colors"
                                >
                                    {view === 'signin' ? 'Sign up' : 'Sign in'}
                                </button>
                            </div>

                            {/* Terms */}
                            <p className="mt-6 text-center text-xs text-white/30">
                                By continuing, you agree to our Terms of Service and Privacy Policy
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
