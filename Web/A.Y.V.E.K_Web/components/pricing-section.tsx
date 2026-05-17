"use client"

import { useState } from "react"
import { Check, Zap, Globe, Diamond } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { AuthModal } from "@/components/auth-modal"

const plans = [
  {
    name: "A.Y.V.E.K - Core",
    tagline: "High quality, zero complexity.",
    description: "Explore the foundation of AI imagery with the A1 Engine.",
    monthlyPrice: 4.99,
    yearlyPrice: 3.99,
    icon: Zap,
    variantId: process.env.NEXT_PUBLIC_LS_CORE_VARIANT_ID || "variant_core",
    features: [
      { text: "A.Y.V.E.K-A1 Core Engine", highlight: true },
      "100 cinematic generations",
      "1024×1024 standard output",
      "Personal commercial license",
      "Community access",
      "Standard speed queue",
    ],
    highlighted: false,
    gradient: "from-slate-400 to-slate-500",
    iconBg: "from-slate-500/20 to-slate-600/20",
    dotColor: "bg-cyan-500",
  },
  {
    name: "A.Y.V.E.K - Cinematic",
    tagline: "Elite-level photorealism.",
    description: "Master the art of cinematic storytelling. Access dual-engines (A1+A2).",
    monthlyPrice: 9.99,
    yearlyPrice: 7.99,
    icon: Globe,
    variantId: process.env.NEXT_PUBLIC_LS_CINEMATIC_VARIANT_ID || "variant_cinematic",
    features: [
      { text: "Dual-Core: A1 + A2 Engines", highlight: true },
      "500 cinema-grade generations",
      "4K Ultra-HD resolution",
      "Priority processing queue",
      "Commercial studio license",
      "Specific style finetuning",
      "Advanced prompt adherence",
    ],
    highlighted: true,
    gradient: "from-amber-400 to-orange-500",
    iconBg: "from-amber-500/20 to-orange-500/20",
    dotColor: "bg-amber-500",
  },
  {
    name: "A.Y.V.E.K - Titan",
    tagline: "8K Mastery & Infinite Power.",
    description: "Total creative sovereignty. The full power of the A.Y.V.E.K suite.",
    monthlyPrice: 19.99,
    yearlyPrice: 15.99,
    icon: Diamond,
    variantId: process.env.NEXT_PUBLIC_LS_TITAN_VARIANT_ID || "variant_titan",
    features: [
      { text: "Tri-Core: A1, A2 & A3 Titan", highlight: true },
      "Unlimited generations",
      { text: "8K Extreme Resolution", highlight: true },
      { text: "Real-time Generation Mode", highlight: true },
      "Zero-wait instant queue",
      "Enterprise API Access",
      "White-glove 24/7 support",
      "Private model training",
    ],
    highlighted: false,
    gradient: "from-indigo-400 to-purple-600",
    featureHighlightColor: "text-purple-400",
    dotColor: "bg-indigo-500",
  },
]

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  return (
    <section className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView="signup"
      />

      {/* Background glow for atmosphere */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <h2
            className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">True Power</span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
            Choose your level of influence. From essential tools to god-like creative control.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-20">
          <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-white' : 'text-neutral-500'}`}>
            Monthly
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="data-[state=checked]:bg-amber-500 bg-neutral-800 border-neutral-700"
          />
          <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-white' : 'text-neutral-500'}`}>
            Annual
          </span>
          <span className="px-3 py-1 text-[10px] font-bold bg-amber-500 text-black rounded-full uppercase tracking-wider">
            2 months free
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => {
            const Icon = plan.icon
            return (
              <div
                key={plan.name}
                className={`relative group rounded-[2rem] p-8 flex flex-col transition-all duration-500 ${plan.highlighted
                  ? "bg-gradient-to-b from-neutral-800 via-neutral-900 to-black border border-amber-500/50 shadow-[0_0_60px_-15px_rgba(245,158,11,0.2)] z-10 scale-105 origin-top"
                  : "bg-neutral-950/50 border border-white/5 hover:border-white/10 hover:bg-neutral-900/50"
                  }`}
              >
                {/* Highlight Badge */}
                {plan.highlighted && (
                  <div className="absolute -top-5 left-0 right-0 flex justify-center">
                    <span className="px-4 py-1.5 text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-black rounded-full shadow-lg shadow-amber-500/20 uppercase tracking-widest">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="mb-8">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${plan.iconBg} border border-white/5`}>
                    <Icon className={`w-6 h-6 ${plan.highlighted ? 'text-amber-400' : 'text-neutral-400'}`} />
                  </div>

                  <h3
                    className={`text-2xl font-bold mb-2 tracking-wide flex items-center gap-3 ${plan.highlighted ? 'text-white' : 'text-neutral-200'}`}
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {/* Model Color Dot */}
                    <span className={`w-2.5 h-2.5 rounded-full ${plan.dotColor} shadow-[0_0_8px_currentColor]`} />
                    {plan.name}
                  </h3>
                  <div className="h-px w-10 bg-gradient-to-r from-white/20 to-transparent my-4" />

                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-white tracking-tighter">
                      ${isAnnual ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-neutral-500">/mo</span>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  className={`w-full mb-10 h-12 rounded-xl font-medium tracking-wide transition-all duration-300 ${plan.highlighted
                    ? "bg-white text-black hover:bg-neutral-200 hover:scale-[1.02] shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
                    : "bg-neutral-800 text-white hover:bg-neutral-700 hover:scale-[1.02]"
                    }`}
                >
                  Select {plan.name.split(' - ')[1]}
                </Button>

                {/* Features */}
                <div className="space-y-4">
                  {plan.features.map((feature, fIndex) => {
                    const isHighlight = typeof feature === 'object'
                    const text = isHighlight ? feature.text : feature
                    return (
                      <div key={fIndex} className="flex items-start gap-3 group/item">
                        <div className={`mt-1 w-4 h-4 rounded-full flex items-center justify-center ${plan.highlighted ? 'bg-emerald-500/20' : 'bg-neutral-800'
                          }`}>
                          <Check className={`w-2.5 h-2.5 ${plan.highlighted ? 'text-emerald-400' : 'text-emerald-600'
                            }`} />
                        </div>
                        <span className={`text-sm transition-colors ${isHighlight
                          ? 'text-white font-medium'
                          : 'text-neutral-500 group-hover/item:text-neutral-400'
                          }`}>
                          {text}
                        </span>
                      </div>
                    )
                  })}
                </div>

              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
