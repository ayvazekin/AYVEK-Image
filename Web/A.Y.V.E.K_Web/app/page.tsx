import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PoweredBySection } from "@/components/powered-by-section"
import { ArcDivider } from "@/components/arc-divider"
import { PricingSection } from "@/components/pricing-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <PoweredBySection />
      <ArcDivider />
      <PricingSection />
      <Footer />
    </main>
  )
}
