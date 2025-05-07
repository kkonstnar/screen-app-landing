"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  Download,
  Share2,
  Users,
  Briefcase,
  Laptop,
  Coffee,
  Smartphone,
  FileText,
  Headphones,
  Pencil,
  CreditCard,
  Bookmark,
} from "lucide-react"

export default function EventPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [copied, setCopied] = useState(false)
  const essentialItems = [
    {
      name: "Laptop & Charger",
      description: "Bring a fully charged laptop with all necessary software installed.",
      icon: <Laptop className="h-5 w-5 text-blue-600" />,
      essential: true,
    },
    {
      name: "Resume (5 copies)",
      description: "Bring printed copies of your most recent resume on quality paper.",
      icon: <FileText className="h-5 w-5 text-blue-600" />,
      essential: true,
    },
    {
      name: "Business Cards",
      description: "Have professional business cards ready to exchange with recruiters and peers.",
      icon: <Briefcase className="h-5 w-5 text-blue-600" />,
      essential: true,
    },
    {
      name: "Portfolio Materials",
      description: "Bring any relevant work samples or portfolio pieces to showcase your skills.",
      icon: <Bookmark className="h-5 w-5 text-blue-600" />,
      essential: true,
    },
    {
      name: "Government ID",
      description: "Required for check-in and building access.",
      icon: <CreditCard className="h-5 w-5 text-blue-600" />,
      essential: true,
    },
    {
      name: "Event Ticket/QR Code",
      description: "Have your digital or printed ticket ready for quick entry.",
      icon: <Smartphone className="h-5 w-5 text-blue-600" />,
      essential: true,
    },
  ]

  const recommendedItems = [
    {
      name: "Notepad & Pen",
      description: "For taking notes during workshops and networking conversations.",
      icon: <Pencil className="h-5 w-5 text-indigo-600" />,
    },
    {
      name: "Headphones",
      description: "Useful for virtual interviews or quiet work sessions between events.",
      icon: <Headphones className="h-5 w-5 text-indigo-600" />,
    },
    {
      name: "Water Bottle",
      description: "Stay hydrated throughout the day with a reusable water bottle.",
      icon: <Coffee className="h-5 w-5 text-indigo-600" />,
    },
    {
      name: "Business Attire",
      description: "Dress professionally - business casual is recommended for this event.",
      icon: <Users className="h-5 w-5 text-indigo-600" />,
    },
  ]

  // Ref and visibility states for essential items
  const essentialItemsRefs = useRef([])
  const [essentialItemsVisible, setEssentialItemsVisible] = useState([])

  // Ref and visibility states for recommended items
  const recommendedItemsRefs = useRef([])
  const [recommendedItemsVisible, setRecommendedItemsVisible] = useState([])

  // Ref and visibility states for schedule items
  const scheduleItemsRefs = useRef([])
  const [scheduleItemsVisible, setScheduleItemsVisible] = useState([])

  // Ref and visibility states for FAQ items
  const faqItemsRefs = useRef([])
  const [faqItemsVisible, setFaqItemsVisible] = useState([])

  useEffect(() => {
    setIsLoaded(true)

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust as needed
    }

    const essentialObserver = new IntersectionObserver((entries) => {
      setEssentialItemsVisible((prev) => {
        const updatedVisibilities = [...prev]
        entries.forEach((entry) => {
          const index = Number.parseInt(entry.target.dataset.index)
          if (entry.isIntersecting && updatedVisibilities[index] === false) {
            updatedVisibilities[index] = true
          }
        })
        return updatedVisibilities
      })
    }, observerOptions)

    const recommendedObserver = new IntersectionObserver((entries) => {
      setRecommendedItemsVisible((prev) => {
        const updatedVisibilities = [...prev]
        entries.forEach((entry) => {
          const index = Number.parseInt(entry.target.dataset.index)
          if (entry.isIntersecting && updatedVisibilities[index] === false) {
            updatedVisibilities[index] = true
          }
        })
        return updatedVisibilities
      })
    }, observerOptions)

    const scheduleObserver = new IntersectionObserver((entries) => {
      setScheduleItemsVisible((prev) => {
        const updatedVisibilities = [...prev]
        entries.forEach((entry) => {
          const index = Number.parseInt(entry.target.dataset.index)
          if (entry.isIntersecting && updatedVisibilities[index] === false) {
            updatedVisibilities[index] = true
          }
        })
        return updatedVisibilities
      })
    }, observerOptions)

    const faqObserver = new IntersectionObserver((entries) => {
      setFaqItemsVisible((prev) => {
        const updatedVisibilities = [...prev]
        entries.forEach((entry) => {
          const index = Number.parseInt(entry.target.dataset.index)
          if (entry.isIntersecting && updatedVisibilities[index] === false) {
            updatedVisibilities[index] = true
          }
        })
        return updatedVisibilities
      })
    }, observerOptions)

    essentialItemsRefs.current.forEach((ref, index) => {
      if (ref) {
        essentialObserver.observe(ref)
      }
    })

    recommendedItemsRefs.current.forEach((ref, index) => {
      if (ref) {
        recommendedObserver.observe(ref)
      }
    })

    scheduleItemsRefs.current.forEach((ref, index) => {
      if (ref) {
        scheduleObserver.observe(ref)
      }
    })

    faqItemsRefs.current.forEach((ref, index) => {
      if (ref) {
        faqObserver.observe(ref)
      }
    })

    return () => {
      essentialObserver.disconnect()
      recommendedObserver.disconnect()
      scheduleObserver.disconnect()
      faqObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    // Initialize visibility states
    setEssentialItemsVisible(Array(essentialItems.length).fill(false))
    setRecommendedItemsVisible(Array(recommendedItems.length).fill(false))
    setScheduleItemsVisible(Array(5).fill(false)) // Assuming 5 schedule items
    setFaqItemsVisible(Array(4).fill(false)) // Assuming 4 FAQ items
  }, [essentialItems.length, recommendedItems.length])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero section with event details */}
      <section className="pt-40 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Event details */}
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
                  <Calendar className="h-4 w-4" />
                  <span>May 10th, 2025</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  ScreenApp Career Fair & Networking Event
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Join us for a day of career opportunities, skill-building workshops, and networking with top employers
                  in the tech industry.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span>Tech Innovation Center, San Francisco</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-8">
                  <Link
                    href="/event/register"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white rounded-full px-6 py-3 font-medium hover:bg-blue-700 transition-all"
                  >
                    <Users className="h-4 w-4" />
                    <span>Register Now</span>
                  </Link>
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 rounded-full px-6 py-3 font-medium hover:bg-gray-50 transition-all"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>{copied ? "Link Copied!" : "Share Event"}</span>
                  </button>
                </div>
              </div>

              {/* Event image */}
              <div className="w-full md:w-2/5 flex-shrink-0">
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?key=event-image&text=Career Fair&width=500&height=300"
                    alt="ScreenApp Career Fair"
                    width={500}
                    height={300}
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <div className="text-white text-sm font-medium">Over 50+ companies will be present</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to bring section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What to Bring</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                To make the most of the ScreenApp Career Fair, please come prepared with the following items:
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <span className="bg-blue-100 text-blue-800 p-2 rounded-full mr-3">
                  <CheckCircle className="h-5 w-5" />
                </span>
                Essential Items
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {essentialItems.map((item, index) => (
                  <div
                    key={item.name}
                    ref={(el) => (essentialItemsRefs.current[index] = el)}
                    data-index={index}
                    className={`bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-700 ${
                      essentialItemsVisible[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start">
                      <div className="bg-blue-50 p-3 rounded-lg mr-4">{item.icon}</div>
                      <div>
                        <h4 className="text-lg font-bold mb-2">{item.name}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <span className="bg-indigo-100 text-indigo-800 p-2 rounded-full mr-3">
                  <CheckCircle className="h-5 w-5" />
                </span>
                Recommended Items
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedItems.map((item, index) => (
                  <div
                    key={item.name}
                    ref={(el) => (recommendedItemsRefs.current[index] = el)}
                    data-index={index}
                    className={`bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-700 ${
                      recommendedItemsVisible[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start">
                      <div className="bg-indigo-50 p-3 rounded-lg mr-4">{item.icon}</div>
                      <div>
                        <h4 className="text-lg font-bold mb-2">{item.name}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event schedule section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Event Schedule</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Here's what you can expect throughout the day:</p>
            </div>

            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <div
                  key={index}
                  ref={(el) => (scheduleItemsRefs.current[index] = el)}
                  data-index={index}
                  className={`bg-white p-6 rounded-xl shadow-sm transition-all duration-700 ${
                    scheduleItemsVisible[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Keep the existing content for each schedule item */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="text-blue-600 font-medium mb-1">9:00 AM - 10:00 AM</div>
                      <h3 className="text-xl font-bold">Registration & Welcome Breakfast</h3>
                      <p className="text-gray-600 mt-2">
                        Check in, collect your badge, and enjoy a light breakfast while networking with other attendees.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg flex-shrink-0">
                      <Coffee className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Download section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Prepare for Success</h2>
            <p className="text-xl mb-8">Download our event guide with tips for making the most of the career fair.</p>
            <Link
              href="/downloads/event-guide.pdf"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download Event Guide</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

            <div className="space-y-6">
              {[1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  ref={(el) => (faqItemsRefs.current[index] = el)}
                  data-index={index}
                  className={`bg-gray-50 p-6 rounded-lg transition-all duration-700 ${
                    faqItemsVisible[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-xl font-bold mb-3">Is there a dress code for the event?</h3>
                  <p className="text-gray-600">
                    Business casual attire is recommended. Remember, you'll be meeting potential employers, so dressing
                    professionally is important.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
