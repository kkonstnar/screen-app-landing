"use client"

import { Shield, CreditCard } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function FeaturesSection() {
  const titleAnimation = useScrollAnimation()
  const feature1Animation = useScrollAnimation({ threshold: 0.1 })
  const feature2Animation = useScrollAnimation({ threshold: 0.1 })

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2
          ref={titleAnimation.ref}
          className={`text-3xl md:text-5xl font-bold text-center mb-16 max-w-4xl mx-auto leading-tight transition-all duration-700 ${
            titleAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          More reasons to use ScreenApp for your next job search
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Fast Hiring Feature */}
          <div
            ref={feature1Animation.ref}
            className={`bg-white p-8 rounded-xl shadow-sm transition-all duration-700 ${
              feature1Animation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-block mb-6">
              <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center border border-gray-100">
                <CreditCard className="w-8 h-8 text-gray-700" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Get paid faster.</h3>
            <p className="text-gray-700">
              Complete your onboarding and set up direct deposit before you even start. Get your first paycheck without
              delay.
            </p>
          </div>

          {/* Privacy Feature */}
          <div
            ref={feature2Animation.ref}
            className={`bg-white p-8 rounded-xl shadow-sm transition-all duration-700 ${
              feature2Animation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="inline-block mb-6">
              <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center border border-gray-100">
                <Shield className="w-8 h-8 text-gray-700" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Privacy first.</h3>
            <p className="text-gray-700">
              You own all the data about yourself. Your resume, job history, and personal information are never shared
              with employers without your explicit permission.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
