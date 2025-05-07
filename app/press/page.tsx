"use client"

import type React from "react"

import { useState, useRef } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { submitPressForm } from "../actions/press-form"
import { CheckCircle, AlertCircle } from "lucide-react"

export default function PressPage() {
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const titleAnimation = useScrollAnimation()
  const contentAnimation1 = useScrollAnimation({ threshold: 0.1 })
  const contentAnimation2 = useScrollAnimation({ threshold: 0.1 })
  const contentAnimation3 = useScrollAnimation({ threshold: 0.1 })
  const formTitleAnimation = useScrollAnimation({ threshold: 0.1 })
  const formAnimation = useScrollAnimation({ threshold: 0.1 })
  const resourcesAnimation = useScrollAnimation({ threshold: 0.1 })
  const featuredAnimation = useScrollAnimation({ threshold: 0.1 })

  // Initialize scroll animations for resources here
  const resourceAnimations = Array.from({ length: 3 }, () => useScrollAnimation({ threshold: 0.1 }))
  const featuredCompanyAnimations = Array.from({ length: 4 }, () => useScrollAnimation({ threshold: 0.1 }))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus(null)

    try {
      const formData = new FormData(e.currentTarget)
      const result = await submitPressForm(formData)

      setFormStatus(result)

      if (result.success) {
        // Reset form on success
        formRef.current?.reset()
      }
    } catch (error) {
      setFormStatus({
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="pt-40 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1
              ref={titleAnimation.ref}
              className={`text-4xl font-bold mb-8 transition-all duration-700 ${
                titleAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              About ScreenApp
            </h1>

            <div className="space-y-6 text-lg text-gray-700">
              <p
                ref={contentAnimation1.ref}
                className={`transition-all duration-700 ${
                  contentAnimation1.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                ScreenApp is a highly-decorated job search platform with the power to revolutionize your career journey.
                It launched in 2023 by a team of passionate engineers and HR specialists from across the globe and has
                quickly become the preferred app of job seekers and recruiters worldwide.
              </p>

              <p
                ref={contentAnimation2.ref}
                className={`transition-all duration-700 ${
                  contentAnimation2.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                The platform elegantly combines an award-winning interface that's comforting and easy to use, with
                powerful and detailed real-time job tracking features, such as application status updates, interview
                scheduling, and feedback notifications — often long before recruiters communicate them to you.
              </p>

              <p
                ref={contentAnimation3.ref}
                className={`transition-all duration-700 ${
                  contentAnimation3.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                ScreenApp acts as both a job search companion and a career development tool, allowing you to quickly
                upload your resume and preferences to match with relevant positions using AI-powered skill assessment
                technology. The app was a 2024 HR Tech Innovation Award winner, 2024 Best User Experience finalist, and
                boasts hundreds of thousands of active users.
              </p>
            </div>

            <div className="mt-20 flex flex-col md:flex-row gap-12">
              <div
                ref={formTitleAnimation.ref}
                className={`md:w-1/2 transition-all duration-700 ${
                  formTitleAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <h2 className="text-2xl font-bold mb-4">Join our Media List</h2>
                <p className="text-gray-600 mb-6">
                  Stay in the loop with the latest ScreenApp news and updates sent straight to your inbox.
                </p>
              </div>

              <div
                ref={formAnimation.ref}
                className={`md:w-1/2 transition-all duration-700 ${
                  formAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                {formStatus && (
                  <div
                    className={`mb-6 p-4 rounded-md ${
                      formStatus.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                    }`}
                  >
                    <div className="flex items-center">
                      {formStatus.success ? (
                        <CheckCircle className="h-5 w-5 mr-2" />
                      ) : (
                        <AlertCircle className="h-5 w-5 mr-2" />
                      )}
                      <p>{formStatus.message}</p>
                    </div>
                  </div>
                )}

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Your First Name"
                        required
                        className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Your Last Name"
                        required
                        className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Where should we send updates?"
                      required
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="publication" className="block text-sm font-medium text-gray-700 mb-1">
                      Publication/Organization <span className="text-gray-400 text-sm font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="publication"
                      name="publication"
                      placeholder="Which publication do you represent?"
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Submitting..." : "Join Now"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2
              ref={resourcesAnimation.ref}
              className={`text-3xl font-bold mb-12 text-center transition-all duration-700 ${
                resourcesAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Press Resources
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((index) => {
                const { ref, isVisible } = resourceAnimations[index - 1]
                return (
                  <div
                    key={index}
                    ref={ref}
                    className={`bg-white p-6 rounded-lg shadow-sm transition-all duration-700 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <h3 className="text-xl font-bold mb-3">
                      {index === 1 ? "Press Kit" : index === 2 ? "Recent News" : "Media Inquiries"}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {index === 1
                        ? "Download logos, screenshots, and brand guidelines for media use."
                        : index === 2
                          ? "Browse our latest press releases and company announcements."
                          : "For interview requests and other press inquiries, please contact our team."}
                    </p>
                    <a href="#" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
                      {index === 1 ? "Download Press Kit" : index === 2 ? "View News" : "Contact Press Team"}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={
                            index === 1
                              ? "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              : index === 2
                                ? "M9 5l7 7-7 7"
                                : "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          }
                        />
                      </svg>
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              ref={featuredAnimation.ref}
              className={`text-3xl font-bold mb-12 text-center transition-all duration-700 ${
                featuredAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Featured In
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {["TechCrunch", "Forbes", "WIRED", "Fast Company"].map((company, index) => {
                const { ref, isVisible } = featuredCompanyAnimations[index]
                return (
                  <div
                    key={company}
                    ref={ref}
                    className={`grayscale hover:grayscale-0 transition-all duration-700 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <img
                      src={`/placeholder.svg?key=1twpv&key=5t4jf&key=${company.toLowerCase()}&text=${company}`}
                      alt={company}
                      className="h-8 w-auto mx-auto"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
