import LandingNavbar from "@/components/landing-navbar"
import Hero from "@/components/landing/hero"
import Footer from "@/components/footer"
import Cta from "@/components/landing/cta"
import Pricing from "@/components/landing/pricing"
import Features from "@/components/landing/features"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar />
      <Hero/>      
      <Features/>
      <Pricing/>
      <Cta/>
      <Footer/>
    </div>
  )
}

