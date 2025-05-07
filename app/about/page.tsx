"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const heroAnimation = useScrollAnimation()
  const titleAnimation = useScrollAnimation()
  const contentAnimation1 = useScrollAnimation({ threshold: 0.1 })
  const contentAnimation2 = useScrollAnimation({ threshold: 0.1 })
  const contentAnimation3 = useScrollAnimation({ threshold: 0.1 })
  const signatureAnimation = useScrollAnimation({ threshold: 0.1 })

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero image with blur/gradient on sides - reduced height */}
      <div className="relative w-full pt-24 pb-8 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto relative">
            {/* Image container with overflow hidden */}
            <div className="relative h-[250px] md:h-[310px] w-full overflow-hidden rounded-lg">
              {/* Main image */}
              <Image
                src="/I-to-Comb shaped engineer.png?key=blueprint-collage&width=1200&height=250&text=ScreenApp Blueprint"
                alt="ScreenApp Blueprint"
                fill
                className="object-cover object-center"
                priority
              />

              {/* Gradient overlays on sides */}
              <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-white to-transparent"></div>
              <div className="absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-white to-transparent"></div>
              </div>
          </div>
        </div>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Open letter heading */}
            <h1
              ref={titleAnimation.ref}
              className={`text-4xl md:text-5xl font-bold mb-10 leading-tight transition-all duration-700 ${
                titleAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              An open letter from our CEO: <br />
              why we built ScreenApp
            </h1>

            {/* Letter content */}
            <div className="space-y-6 text-lg">
              <p
                ref={contentAnimation1.ref}
                className={`text-xl md:text-2xl transition-all duration-700 ${
                  contentAnimation1.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Can you remember the first time you applied for a job that truly excited you?
              </p>

              <p
                className={`transition-all duration-700 ${
                  contentAnimation1.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                We can. It was a thrilling experience, in every sense of the word. As a student, you send out
                applications, attend career fairs, network—but landing that perfect opportunity is a{" "}
                <span className="bg-yellow-100 px-1">wholly different experience</span>. And, maybe like you, we were
                hooked from the first acceptance letter.
              </p>

              <p
                ref={contentAnimation2.ref}
                className={`transition-all duration-700 ${
                  contentAnimation2.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Unfortunately, as stories so often go, the magic fades as you get older. Job searching starts to feel
                like a means to an end. Rejections arrive seemingly out of nowhere, your applications get lost in the
                void, and the entire process becomes increasingly opaque and frustrating.
              </p>

              <p
                className={`transition-all duration-700 ${
                  contentAnimation2.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                Job searching represents an unprecedented opportunity—not just to find employment—but to find purpose.
                Our <span className="bg-yellow-100 px-1">AI-powered platform</span> is built on a sophisticated system
                with three major components designed to transform job searching for everyone.
              </p>

              <p
                ref={contentAnimation3.ref}
                className={`transition-all duration-700 ${
                  contentAnimation3.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <span className="bg-yellow-100 px-1">Skill Assessment</span> provides accurate, data-driven evaluation
                of your abilities. <span className="bg-yellow-100 px-1">Application Tracking</span> provides real-time
                updates on your job applications. <span className="bg-yellow-100 px-1">Matching Algorithm</span>{" "}
                provides personalized job recommendations based on your unique profile.
              </p>

              <p
                className={`transition-all duration-700 ${
                  contentAnimation3.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                All three learn from every interaction to improve the system. That's what makes ScreenApp{" "}
                <span className="bg-yellow-100 px-1">the most effective AI-powered job platform</span>. And we are
                determined to make ScreenApp the best, and the only job search platform you will ever need.
              </p>

              {/* Signature */}
              <div
                ref={signatureAnimation.ref}
                className={`pt-8 transition-all duration-700 ${
                  signatureAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="border-b border-gray-300 pb-2 mb-4">
                  <Image
                    src="/placeholder.svg?key=signature&width=300&height=80&text=Alex Chen"
                    alt="CEO Signature"
                    width={240}
                    height={60}
                    className="mb-2"
                  />
                </div>
                <p className="text-xl font-medium">Alex Chen</p>
                <p className="text-gray-700">CEO and Co-founder</p>

                <p className="mt-8 text-gray-700">
                  PS. Read our{" "}
                  <Link href="/manifesto" className="text-blue-600 underline hover:text-blue-800">
                    Manifesto
                  </Link>{" "}
                  page to see our take on the future of job searching and talent acquisition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
