"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Shield, FileText, Lock, Cookie } from "lucide-react"

interface LegalModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    content: React.ReactNode
}

export function LegalModal({ isOpen, onClose, title, content }: LegalModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full max-w-3xl max-h-[80vh] bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-neutral-900/30">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                                        {title.includes("Privacy") ? <Lock className="w-4 h-4 text-emerald-400" /> :
                                            title.includes("Cookie") ? <Cookie className="w-4 h-4 text-amber-400" /> :
                                                <Shield className="w-4 h-4 text-blue-400" />}
                                    </div>
                                    <h2 className="text-lg font-medium text-white tracking-wide">{title}</h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-white/5 text-neutral-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-8 overflow-y-auto custom-scrollbar text-neutral-300 space-y-6 leading-relaxed text-sm">
                                {content}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
