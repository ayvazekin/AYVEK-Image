"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldCheck, ArrowRight, Lock } from "lucide-react"

export function TermsAcceptanceModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [accepted, setAccepted] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    useEffect(() => {
        // Check local storage
        const hasAccepted = localStorage.getItem("ayvek_terms_accepted")
        if (!hasAccepted) {
            // Small delay for entrance
            const timer = setTimeout(() => setIsOpen(true), 1000)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleAccept = () => {
        setIsClosing(true)
        setTimeout(() => {
            localStorage.setItem("ayvek_terms_accepted", "true")
            setIsOpen(false)
        }, 500)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200]"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-[201] p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8 flex flex-col items-center text-center relative"
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                                <ShieldCheck className="w-8 h-8 text-white" />
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-2">Welcome to A.Y.V.E.K</h2>
                            <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                                To continue to the Dream Engine, please agree to our Terms of Service and Privacy Policy. We are committed to protecting your data and creativity.
                            </p>

                            {/* Checkbox Area */}
                            <div
                                className="flex items-center gap-3 w-full p-4 rounded-xl bg-white/5 border border-white/5 mb-8 cursor-pointer hover:bg-white/10 transition-colors"
                                onClick={() => setAccepted(!accepted)}
                            >
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${accepted ? 'bg-white border-white' : 'border-neutral-600 bg-transparent'}`}>
                                    {accepted && <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                </div>
                                <span className="text-sm text-neutral-300 select-none">I accept the Terms & Conditions</span>
                            </div>

                            {/* Actions */}
                            <button
                                onClick={handleAccept}
                                disabled={!accepted}
                                className="w-full h-12 rounded-full bg-white text-black font-medium text-sm flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
                            >
                                <span>Enter Experience</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>

                            <p className="mt-6 text-xs text-neutral-600">
                                Protected by A.Y.V.E.K Secure Auth
                            </p>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
