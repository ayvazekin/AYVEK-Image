"use client"

import { useState } from "react"
import Link from "next/link"
import { LegalModal } from "./legal-modal"

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Docs"],
  Company: ["About", "Blog", "Careers", "Press"],
  Resources: ["Community", "Contact", "DPA", "Privacy Policy"],
  Legal: ["Terms", "Privacy", "Cookies", "Licenses"],
}

// Placeholder Content Generators
const getLegalContent = (type: string) => {
  switch (type) {
    case "Terms":
    case "Terms of Service":
      return (
        <>
          <h3 className="text-white text-base font-semibold mb-2">1. Introduction</h3>
          <p>Welcome to A.Y.V.E.K. By accessing or using our website and services, you agree to be bound by these Terms of Service and our Privacy Policy.</p>
          <h3 className="text-white text-base font-semibold mb-2 pt-4">2. Use License</h3>
          <p>Permission is granted to temporarily download one copy of the materials (information or software) on A.Y.V.E.K's website for personal, non-commercial transitory viewing only.</p>
          <h3 className="text-white text-base font-semibold mb-2 pt-4">3. Disclaimer</h3>
          <p>The materials on A.Y.V.E.K's website are provided on an 'as is' basis. A.Y.V.E.K makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          <h3 className="text-white text-base font-semibold mb-2 pt-4">4. Limitations</h3>
          <p>In no event shall A.Y.V.E.K or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on A.Y.V.E.K's website.</p>
        </>
      )
    case "Privacy":
    case "Privacy Policy":
      return (
        <>
          <h3 className="text-white text-base font-semibold mb-2">1. Data Collection</h3>
          <p>We collect information you provide directly to us, such as when you create an account, update your profile, request customer support, or otherwise communicate with us.</p>
          <h3 className="text-white text-base font-semibold mb-2 pt-4">2. Use of Information</h3>
          <p>We may use the information we collect to operate, promote, and improve our services, to develop new products and services, to improve our safety and security, and for other legitimate business purposes.</p>
          <h3 className="text-white text-base font-semibold mb-2 pt-4">3. Sharing of Information</h3>
          <p>We do not share your personal information with third parties except as described in this privacy policy or with your consent.</p>
        </>
      )
    case "Cookies":
    case "Cookie Policy":
      return (
        <>
          <h3 className="text-white text-base font-semibold mb-2">1. What are Cookies?</h3>
          <p>Cookies are small text files that are used to store small pieces of information. They are stored on your device when the website is loaded on your browser.</p>
          <h3 className="text-white text-base font-semibold mb-2 pt-4">2. How We Use Cookies</h3>
          <p>We use cookies to make our website work more efficiently, to provide you with a better user experience, and to analyze how our website is used.</p>
        </>
      )
    case "DPA":
      return (
        <>
          <h3 className="text-white text-base font-semibold mb-2">Data Processing Agreement</h3>
          <p>This Data Processing Agreement ("DPA") forms part of the Master Services Agreement or other written or electronic agreement between A.Y.V.E.K and Customer for the purchase of online services from A.Y.V.E.K.</p>
        </>
      )
    case "Licenses":
      return (
        <>
          <h3 className="text-white text-base font-semibold mb-2">Open Source Licenses</h3>
          <p>A.Y.V.E.K utilizes various open source software components. The following is a list of open source components we use and the licenses under which they are distributed.</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-neutral-400">
            <li>Next.js - MIT License</li>
            <li>React - MIT License</li>
            <li>Tailwind CSS - MIT License</li>
            <li>Lucide Icons - ISC License</li>
          </ul>
        </>
      )
    default:
      return <p>Content for {type} is currently being updated. Please check back later.</p>
  }
}

export function Footer() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalContent, setModalContent] = useState<React.ReactNode>(null)

  const openLegalModal = (title: string) => {
    setModalTitle(title)
    setModalContent(getLegalContent(title))
    setModalOpen(true)
  }

  return (
    <>
      <footer className="border-t border-border/50 bg-background">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2">
                <span
                  className="text-white text-base uppercase"
                  style={{
                    fontFamily: 'var(--font-geist-sans)',
                    fontWeight: 200,
                    letterSpacing: '0.6em'
                  }}
                >
                  A.Y.V.E.K
                </span>
              </Link>
              <p className="mt-4 text-sm text-neutral-400 font-light tracking-wide italic">
                Where Vision Meets Reality
              </p>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold text-foreground mb-4">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      {category === "Legal" || link === "DPA" || link === "Privacy Policy" ? (
                        <button
                          onClick={() => openLegalModal(link)}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                        >
                          {link}
                        </button>
                      ) : (
                        <Link
                          href="#"
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {link}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2027 A.Y.V.E.K. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <button onClick={() => openLegalModal("Terms")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </button>
              <button onClick={() => openLegalModal("Privacy")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </button>
              <button onClick={() => openLegalModal("Cookies")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookies
              </button>
            </div>
          </div>
        </div>
      </footer>

      <LegalModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        content={modalContent}
      />
    </>
  )
}
