"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Briefcase, Clock } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function SignupSection() {
  const waveRef = useRef<SVGSVGElement>(null)
  const logosRef = useRef<HTMLDivElement>(null)

  const subtitleAnimation = useScrollAnimation()
  const titleAnimation = useScrollAnimation({ threshold: 0.05 })
  const descAnimation = useScrollAnimation({ threshold: 0.05 })

  useEffect(() => {
    // Animate the wave
    const wave = waveRef.current
    if (!wave) return

    let startTime = 0
    let waveAnimationId: number

    const animateWave = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      // Gentle wave movement
      const paths = wave.querySelectorAll("path")
      paths.forEach((path, index) => {
        const delay = index * 500
        const movement = Math.sin((elapsed + delay) / 1000) * 2
        path.setAttribute("transform", `translate(0, ${movement})`)
      })

      waveAnimationId = requestAnimationFrame(animateWave)
    }

    waveAnimationId = requestAnimationFrame(animateWave)

    // Animate logos
    const logosContainer = logosRef.current
    if (logosContainer) {
      const logos = logosContainer.querySelectorAll("div")
      logos.forEach((logo, index) => {
        logo.style.opacity = "0"
        logo.style.transform = "translateY(20px)"
        logo.style.transition = "opacity 0.5s ease, transform 0.5s ease"
        logo.style.transitionDelay = `${index * 100}ms`

        setTimeout(() => {
          logo.style.opacity = "1"
          logo.style.transform = "translateY(0)"
        }, 100)
      })
    }

    return () => {
      cancelAnimationFrame(waveAnimationId)
    }
  }, [])

  // Sample job offers
  const jobOffers = [
    {
      title: "Senior Frontend Engineer",
      type: "Full-time • Remote",
      salary: "$65K-80K/year",
      company: "Tech Co.",
    },
    {
      title: "Machine Learning Engineer",
      type: "Full-time • Remote",
      salary: "$70K-80K/year",
      company: "AI Solutions",
    },
    {
      title: "DevOps Specialist",
      type: "Contract • Remote",
      salary: "$60/hour",
      company: "Cloud Systems",
    },
  ]

  // Updated employer logos with more specific companies
  const employers = [
    { name: "Google", logo: "/placeholder.svg?key=google-logo&text=Google" },
    { name: "Microsoft", logo: "/placeholder.svg?key=microsoft-logo&text=Microsoft" },
    { name: "Amazon", logo: "/placeholder.svg?key=amazon-logo&text=Amazon" },
    { name: "Apple", logo: "/placeholder.svg?key=apple-logo&text=Apple" },
    { name: "Meta", logo: "/placeholder.svg?key=meta-logo&text=Meta" },
    { name: "Netflix", logo: "/placeholder.svg?key=netflix-logo&text=Netflix" },
    { name: "Salesforce", logo: "/placeholder.svg?key=salesforce-logo&text=Salesforce" },
    { name: "Adobe", logo: "/placeholder.svg?key=adobe-logo&text=Adobe" },
    { name: "IBM", logo: "/placeholder.svg?key=ibm-logo&text=IBM" },
    { name: "Oracle", logo: "/placeholder.svg?key=oracle-logo&text=Oracle" },
  ]

  return (
    <section className="pt-20 pb-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            {(() => {
              return (
                <>
                  <span
                    ref={subtitleAnimation.ref}
                    className={`text-blue-600 font-medium mb-2 block transition-all duration-700 ${
                      subtitleAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                  >
                    A new way to work
                  </span>
                  <h2
                    ref={titleAnimation.ref}
                    className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-700 ${
                      titleAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: "100ms" }}
                  >
                    Sign up once, reach thousands of employers
                  </h2>
                  <p
                    ref={descAnimation.ref}
                    className={`text-lg text-gray-600 mb-10 max-w-3xl mx-auto transition-all duration-700 ${
                      descAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: "200ms" }}
                  >
                    Complete a simple verification process and take our specialized assessments. Our AI then analyzes
                    your skills and preferences to match you with the perfect opportunities at thousands of companies in
                    our network.
                  </p>
                </>
              )
            })()}
          </div>

          {/* Job offers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            {jobOffers.map((job, index) => {
              const { ref, isVisible } = useScrollAnimation()
              return (
                <div
                  key={index}
                  ref={ref}
                  className={`bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{job.title}</h3>
                      <p className="text-gray-500 text-sm">{job.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{job.type}</span>
                    </div>
                    <div className="text-blue-600 font-medium">{job.salary}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Employer logos */}
          <div className="mb-12">
            <h3 className="text-center text-gray-500 mb-8 text-sm font-medium uppercase tracking-wider opacity-0 animate-[fadeIn_0.8s_ease-out_0.6s_forwards]">
              Trusted by leading companies
            </h3>
            <div ref={logosRef} className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {employers.map((employer, index) => (
                <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
                  <Image
                    src={employer.logo || "/placeholder.svg"}
                    alt={employer.name}
                    width={120}
                    height={40}
                    className="h-8 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-blue-600 text-white rounded-full px-6 py-3 font-medium hover:bg-blue-700 transition-all hover:scale-105 transform"
              style={{
                boxShadow: "0 8px 16px -2px rgba(59, 130, 246, 0.3)",
              }}
            >
              <span>Create your screen</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle wave divider for better transition */}
      <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden" style={{ transform: "translateY(-99%)" }}>
        <svg
          ref={waveRef}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-24 text-white"
          style={{ transform: "rotateY(180deg)" }}
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="currentColor"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="currentColor"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </section>
  )
}
