import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import SignupSection from "@/components/signup-section"
import FeaturesSection from "@/components/features-section"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <SignupSection />
      <FeaturesSection />
      <Testimonials />
      <Footer />
    </main>
  )
}
