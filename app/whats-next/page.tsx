"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import {
  Calendar,
  CheckCircle,
  Clock,
  Code,
  FileText,
  Lightbulb,
  MessageSquare,
  Rocket,
  Sparkles,
  Star,
  Zap,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Define the timeline data
const timelineData = [
  {
    id: "q2-2025",
    title: "Q2 2025",
    status: "In Development",
    features: [
      {
        title: "AI-Powered Job Matching",
        description:
          "Our advanced algorithm will match candidates with jobs based on skills, experience, and preferences with 95% accuracy.",
        icon: <Sparkles className="h-5 w-5 text-blue-600" />,
        progress: 70,
      },
      {
        title: "Real-time Application Tracking",
        description:
          "Track your job applications in real-time, with updates on status changes and hiring manager activity.",
        icon: <Clock className="h-5 w-5 text-blue-600" />,
        progress: 85,
      },
      {
        title: "Skill Assessment Platform",
        description:
          "Showcase your abilities through our comprehensive skill assessment platform, verified by industry experts.",
        icon: <Star className="h-5 w-5 text-blue-600" />,
        progress: 60,
      },
    ],
  },
  {
    id: "q3-2025",
    title: "Q3 2025",
    status: "Planning",
    features: [
      {
        title: "Interview Preparation Tools",
        description:
          "AI-powered interview coaching with personalized feedback and industry-specific practice questions.",
        icon: <MessageSquare className="h-5 w-5 text-indigo-600" />,
        progress: 40,
      },
      {
        title: "Employer Verification System",
        description: "Enhanced verification system for employers to ensure legitimacy and build trust in the platform.",
        icon: <CheckCircle className="h-5 w-5 text-indigo-600" />,
        progress: 30,
      },
      {
        title: "Salary Insights",
        description:
          "Access real-time salary data and negotiation tools to help you secure the best compensation package.",
        icon: <FileText className="h-5 w-5 text-indigo-600" />,
        progress: 25,
      },
    ],
  },
  {
    id: "q4-2025",
    title: "Q4 2025",
    status: "Research",
    features: [
      {
        title: "Career Path Visualization",
        description: "Interactive tools to visualize potential career paths based on your skills and interests.",
        icon: <Rocket className="h-5 w-5 text-purple-600" />,
        progress: 15,
      },
      {
        title: "Networking Opportunities",
        description:
          "Connect with professionals in your field through our curated networking events and recommendations.",
        icon: <Zap className="h-5 w-5 text-purple-600" />,
        progress: 10,
      },
      {
        title: "Learning Resources Integration",
        description: "Access personalized learning resources to help you acquire the skills needed for your dream job.",
        icon: <Lightbulb className="h-5 w-5 text-purple-600" />,
        progress: 5,
      },
    ],
  },
  {
    id: "q1-2026",
    title: "Q1 2026",
    status: "Concept",
    features: [
      {
        title: "Global Expansion",
        description:
          "Expanding our platform to support job seekers and employers across multiple countries and languages.",
        icon: <Calendar className="h-5 w-5 text-green-600" />,
        progress: 0,
      },
      {
        title: "API for Developers",
        description: "Public API for developers to build integrations and extensions for the ScreenApp platform.",
        icon: <Code className="h-5 w-5 text-green-600" />,
        progress: 0,
      },
    ],
  },
]

export default function WhatsNextPage() {
  const [activeQuarter, setActiveQuarter] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  const heroAnimation = useScrollAnimation()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handlePrevQuarter = () => {
    setActiveQuarter((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleNextQuarter = () => {
    setActiveQuarter((prev) => (prev < timelineData.length - 1 ? prev + 1 : prev))
  }

  // Get status color based on the status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Development":
        return "bg-blue-100 text-blue-800"
      case "Planning":
        return "bg-indigo-100 text-indigo-800"
      case "Research":
        return "bg-purple-100 text-purple-800"
      case "Concept":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero section */}
      <section className="pt-40 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          {(() => {
            return (
              <div
                ref={heroAnimation.ref}
                className={`max-w-4xl mx-auto text-center transition-all duration-700 ${
                  heroAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Product Roadmap</h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Discover what's coming next for ScreenApp. We're constantly working on new features to make your job
                  search experience even better.
                </p>
              </div>
            )
          })()}
        </div>
      </section>

      {/* Timeline navigation */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Development Timeline</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevQuarter}
                  disabled={activeQuarter === 0}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous quarter"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNextQuarter}
                  disabled={activeQuarter === timelineData.length - 1}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next quarter"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative" ref={timelineRef}>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-full">
                <div
                  className="absolute top-0 left-0 h-1 bg-blue-500 rounded-full"
                  style={{ width: `${((activeQuarter + 1) / timelineData.length) * 100}%` }}
                ></div>
              </div>

              <div className="flex justify-between relative pt-6">
                {timelineData.map((quarter, index) => (
                  <div
                    key={quarter.id}
                    className={`flex flex-col items-center cursor-pointer transition-all ${
                      index <= activeQuarter ? "opacity-100" : "opacity-50"
                    }`}
                    onClick={() => setActiveQuarter(index)}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 ${
                        index <= activeQuarter ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"
                      } -mt-9 z-10 transition-all ${index === activeQuarter ? "scale-125" : ""}`}
                    ></div>
                    <p
                      className={`text-sm font-medium mt-2 ${
                        index === activeQuarter ? "text-blue-600" : "text-gray-500"
                      }`}
                    >
                      {quarter.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuarter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold">{timelineData[activeQuarter].title}</h2>
                    <div className="flex items-center mt-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          timelineData[activeQuarter].status,
                        )}`}
                      >
                        {timelineData[activeQuarter].status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {timelineData[activeQuarter].features.map((feature, index) => {
                    const featureAnimation = useScrollAnimation()
                    return (
                      <div
                        key={feature.title}
                        ref={featureAnimation.ref}
                        className={`bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-700 ${
                          featureAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-start">
                          <div className="bg-gray-100 p-3 rounded-lg mr-4">{feature.icon}</div>
                          <div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-600 mb-4">{feature.description}</p>

                            {/* Progress bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${feature.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-sm text-gray-500">{feature.progress}% complete</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Early access section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Want Early Access?</h2>
            <p className="text-xl mb-8">
              Join our early access program to be the first to try new features as they're developed.
            </p>
            <Link
              href="mailto:earlyaccess@screenapp.com"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors"
            >
              <span>Request Early Access</span>
              <Rocket className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3">When will these features be available?</h3>
                <p className="text-gray-600">
                  The timeline provided is our current development roadmap. While we strive to meet these deadlines,
                  specific features may be released earlier or later depending on development progress and user
                  feedback.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3">How can I provide feedback on upcoming features?</h3>
                <p className="text-gray-600">
                  We value your input! You can send your feedback and suggestions to feedback@screenapp.com. Your
                  insights help us prioritize features and improve our platform.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3">Will there be a beta testing program?</h3>
                <p className="text-gray-600">
                  Yes, we plan to launch a beta testing program for select features. If you're interested in
                  participating, please sign up for our early access program to receive invitations.
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
