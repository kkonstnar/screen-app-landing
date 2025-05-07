"use client"

import { useState, useEffect, useRef, type KeyboardEvent } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Plus, Search, Mail, Keyboard, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function SupportPage() {
  const [openCategory, setOpenCategory] = useState<string>("general")
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [focusedQuestionIndex, setFocusedQuestionIndex] = useState<number>(-1)
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false)

  const questionRefs = useRef<(HTMLButtonElement | null)[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)
  const categoryRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    setIsLoaded(true)

    // Reset question refs when category changes
    questionRefs.current = []
  }, [openCategory])

  const toggleQuestion = (id: string) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const faqCategories = [
    {
      id: "general",
      title: "General",
      questions: [
        {
          id: "what-is-screenapp",
          question: "What is ScreenApp?",
          answer:
            "ScreenApp is an AI-powered job search platform that connects talented professionals with top employers. Our platform uses advanced algorithms to assess skills, match candidates with suitable positions, and provide real-time application tracking.",
        },
        {
          id: "how-does-it-work",
          question: "How does ScreenApp work?",
          answer:
            "After creating an account, you'll complete a skills assessment and build your profile. Our AI then matches you with relevant job opportunities based on your skills, experience, and preferences. You can apply directly through our platform and track your applications in real-time.",
        },
        {
          id: "is-it-free",
          question: "Is ScreenApp free to use?",
          answer:
            "ScreenApp offers both free and premium tiers. The basic account is free and gives you access to job matching and application tracking. Premium features, including advanced skills assessments and priority matching, are available through our subscription plans.",
        },
      ],
    },
    {
      id: "account",
      title: "Account & Profile",
      questions: [
        {
          id: "create-account",
          question: "How do I create an account?",
          answer:
            "Click the 'Sign Up' button on our homepage and follow the prompts. You can sign up using your email, Google account, or LinkedIn profile. Once registered, you'll be guided through setting up your profile and skills assessment.",
        },
        {
          id: "delete-account",
          question: "How can I delete my account?",
          answer:
            "You can delete your account by going to Settings > Account > Delete Account. Please note that this action is permanent and will remove all your data from our platform.",
        },
        {
          id: "update-profile",
          question: "How do I update my profile information?",
          answer:
            "Log in to your account and navigate to the Profile section. Click on 'Edit Profile' to update your personal information, work experience, education, skills, and preferences.",
        },
      ],
    },
    {
      id: "applications",
      title: "Applications & Tracking",
      questions: [
        {
          id: "track-application",
          question: "How can I track my job applications?",
          answer:
            "All applications submitted through ScreenApp are automatically tracked in your Dashboard. You'll receive real-time updates on your application status, including when employers view your profile and any feedback they provide.",
        },
        {
          id: "application-status",
          question: "What do the different application statuses mean?",
          answer:
            "'Submitted' means your application has been sent to the employer. 'Viewed' indicates the employer has opened your application. 'In Progress' means you're being considered. 'Interview' means you've been selected for an interview. 'Offer' means you've received a job offer. 'Closed' means the position has been filled or is no longer available.",
        },
        {
          id: "withdraw-application",
          question: "Can I withdraw my application?",
          answer:
            "Yes, you can withdraw any active application by going to your Dashboard, finding the application, and clicking 'Withdraw Application'. The employer will be notified that you're no longer interested in the position.",
        },
      ],
    },
    {
      id: "assessments",
      title: "Skills Assessment",
      questions: [
        {
          id: "assessment-types",
          question: "What types of skills assessments does ScreenApp offer?",
          answer:
            "ScreenApp offers technical assessments for programming, data analysis, and design skills; soft skills assessments for communication and teamwork; industry-specific assessments for fields like marketing, finance, and healthcare; and cognitive assessments for problem-solving and critical thinking.",
        },
        {
          id: "retake-assessment",
          question: "Can I retake an assessment if I'm not satisfied with my results?",
          answer:
            "Yes, you can retake assessments after a 30-day waiting period. We recommend using this time to improve your skills through our recommended resources and practice exercises.",
        },
        {
          id: "assessment-privacy",
          question: "Who can see my assessment results?",
          answer:
            "Your assessment results are only shared with employers when you apply to their positions. You have full control over which results are visible on your profile and can choose to hide specific assessments if desired.",
        },
      ],
    },
    {
      id: "employers",
      title: "For Employers",
      questions: [
        {
          id: "post-job",
          question: "How can I post a job on ScreenApp?",
          answer:
            "Create an employer account, click 'Post a Job', and follow the guided process to specify job details, required skills, and preferences. Our AI will help you optimize your listing to attract the most qualified candidates.",
        },
        {
          id: "employer-pricing",
          question: "What are the pricing plans for employers?",
          answer:
            "ScreenApp offers flexible pricing for employers based on hiring volume and features needed. Plans start at $199/month for startups and scale up for enterprises. Contact our sales team for a customized quote.",
        },
        {
          id: "candidate-verification",
          question: "How does ScreenApp verify candidate skills?",
          answer:
            "Our platform uses a combination of AI-powered assessments, credential verification, and reference checks to ensure candidates have the skills they claim. All assessment results are standardized and validated against industry benchmarks.",
        },
      ],
    },
    {
      id: "privacy",
      title: "Privacy & Security",
      questions: [
        {
          id: "data-usage",
          question: "How does ScreenApp use my data?",
          answer:
            "We use your data to match you with relevant job opportunities, improve our algorithms, and enhance your experience. We never sell your personal information to third parties. For more details, please review our Privacy Policy.",
        },
        {
          id: "data-security",
          question: "How does ScreenApp protect my information?",
          answer:
            "We employ industry-standard encryption, secure data storage, regular security audits, and strict access controls to protect your information. Our platform is compliant with GDPR, CCPA, and other relevant data protection regulations.",
        },
        {
          id: "data-deletion",
          question: "What happens to my data if I delete my account?",
          answer:
            "When you delete your account, all your personal information is permanently removed from our active databases within 30 days. Some anonymized data may be retained for analytical purposes, but it cannot be traced back to you.",
        },
      ],
    },
  ]

  const filteredCategories = searchQuery
    ? faqCategories
        .map((category) => ({
          ...category,
          questions: category.questions.filter(
            (q) =>
              q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((category) => category.questions.length > 0)
    : faqCategories

  const currentCategory = filteredCategories.find((cat) => cat.id === openCategory) || filteredCategories[0]
  const currentQuestions = currentCategory?.questions || []

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent<HTMLElement> | any) => {
      // Don't handle keyboard shortcuts when user is typing in search
      if (document.activeElement === searchInputRef.current) {
        if (e.key === "Escape") {
          setSearchQuery("")
          searchInputRef.current?.blur()
        }
        return
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setFocusedQuestionIndex((prev) => {
            const nextIndex = prev < currentQuestions.length - 1 ? prev + 1 : 0
            questionRefs.current[nextIndex]?.focus()
            return nextIndex
          })
          break

        case "ArrowUp":
          e.preventDefault()
          setFocusedQuestionIndex((prev) => {
            const nextIndex = prev > 0 ? prev - 1 : currentQuestions.length - 1
            questionRefs.current[nextIndex]?.focus()
            return nextIndex
          })
          break

        case "Enter":
        case " ":
          if (focusedQuestionIndex >= 0 && focusedQuestionIndex < currentQuestions.length) {
            e.preventDefault()
            toggleQuestion(currentQuestions[focusedQuestionIndex].id)
          }
          break

        case "Escape":
          // Close any open questions
          setOpenQuestions({})
          break

        case "/":
          // Focus search
          e.preventDefault()
          searchInputRef.current?.focus()
          break

        case "?":
          // Show keyboard shortcuts
          e.preventDefault()
          setShowKeyboardShortcuts(true)
          break

        default:
          // Number keys 1-9 to navigate categories
          const num = Number.parseInt(e.key)
          if (!isNaN(num) && num >= 1 && num <= faqCategories.length) {
            e.preventDefault()
            const categoryIndex = num - 1
            setOpenCategory(faqCategories[categoryIndex].id)
            categoryRefs.current[categoryIndex]?.focus()
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentQuestions, focusedQuestionIndex])

  // Highlight search terms in text
  const highlightText = (text: string) => {
    if (!searchQuery) return text

    const parts = text.split(new RegExp(`(${searchQuery})`, "gi"))
    return parts.map((part, i) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={i} className="bg-blue-100 text-blue-800 px-0.5 rounded">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="pt-40 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row gap-12">
              {/* Left column - main content */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <motion.h1
                    className="text-5xl font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    FAQs
                  </motion.h1>

                  <motion.button
                    className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors"
                    onClick={() => setShowKeyboardShortcuts(true)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    aria-label="Show keyboard shortcuts"
                  >
                    <Keyboard className="h-4 w-4" />
                    <span className="text-sm">Shortcuts</span>
                  </motion.button>
                </div>

                <motion.p
                  className="text-gray-500 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Last updated May 2025
                </motion.p>

                {/* Search bar */}
                <motion.div
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="flex items-center border-b border-gray-300 py-2 transition-all duration-300 focus-within:border-blue-500">
                    <Search className="h-5 w-5 text-gray-400 mr-2" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search for answers... (Press '/' to focus)"
                      className="w-full outline-none text-gray-700 bg-transparent"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="text-gray-400 hover:text-gray-600"
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </motion.div>

                {/* Category title */}
                <motion.h2
                  className="text-2xl font-bold mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={currentCategory?.id}
                >
                  {currentCategory?.title}
                </motion.h2>

                {/* FAQ questions */}
                <motion.div
                  className="space-y-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLoaded ? 1 : 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <AnimatePresence>
                    {currentQuestions.map((item, questionIndex) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: questionIndex * 0.05 }}
                        className="border-b border-dotted border-gray-200 py-4"
                      >
                        <button
                          ref={(el) => (questionRefs.current[questionIndex] = el)}
                          className={`w-full flex items-start justify-between text-left font-medium group focus:outline-none ${
                            focusedQuestionIndex === questionIndex
                              ? "ring-2 ring-blue-300 ring-offset-2 rounded-sm"
                              : ""
                          }`}
                          onClick={() => toggleQuestion(item.id)}
                          onFocus={() => setFocusedQuestionIndex(questionIndex)}
                          aria-expanded={openQuestions[item.id] || false}
                        >
                          <div className="flex items-center">
                            <div className="mr-3 text-blue-500 transition-transform duration-300 transform">
                              <Plus
                                className={`h-5 w-5 transition-transform duration-300 ${
                                  openQuestions[item.id] ? "rotate-45" : ""
                                }`}
                              />
                            </div>
                            <span className="text-lg group-hover:text-blue-600 transition-colors duration-300">
                              {searchQuery ? highlightText(item.question) : item.question}
                            </span>
                          </div>
                        </button>

                        <AnimatePresence>
                          {openQuestions[item.id] && (
                            <motion.div
                              className="pl-8 pr-4 pt-3 text-gray-600"
                              initial={{ height: 0, opacity: 0, marginTop: 0 }}
                              animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                              exit={{ height: 0, opacity: 0, marginTop: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="text-gray-600 leading-relaxed">
                                {searchQuery ? highlightText(item.answer) : item.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {currentQuestions.length === 0 && (
                    <motion.div
                      className="py-8 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-gray-500">
                        No results found for "{searchQuery}". Try a different search term.
                      </p>
                    </motion.div>
                  )}
                </motion.div>

                {/* Contact support */}
                <motion.div
                  className="mt-16 border-t border-gray-200 pt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h2 className="text-xl font-medium mb-2">Still need help?</h2>
                  <p className="text-gray-600 mb-4">Our support team is here to help you with any questions.</p>
                  <motion.a
                    href="mailto:support@screenapp.com"
                    className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <Mail className="h-4 w-4" />
                    <span>Contact Support</span>
                  </motion.a>
                </motion.div>
              </div>

              {/* Right column - categories */}
              <div className="w-full md:w-64 flex-shrink-0">
                <div className="sticky top-32">
                  <h3 className="text-lg font-medium mb-4 text-gray-400">Categories</h3>
                  <ul className="space-y-3">
                    {faqCategories.map((category, index) => (
                      <li key={category.id}>
                        <button
                          ref={(el) => (categoryRefs.current[index] = el)}
                          onClick={() => setOpenCategory(category.id)}
                          className={`text-left w-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 rounded-sm ${
                            openCategory === category.id
                              ? "text-blue-600 font-medium"
                              : "text-gray-700 hover:text-blue-600"
                          }`}
                        >
                          <span className="text-gray-400 mr-2 text-sm">{index + 1}.</span>
                          {category.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Keyboard shortcuts modal */}
      <AnimatePresence>
        {showKeyboardShortcuts && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowKeyboardShortcuts(false)}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Keyboard className="h-5 w-5" />
                  Keyboard Shortcuts
                </h2>
                <button
                  onClick={() => setShowKeyboardShortcuts(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close keyboard shortcuts"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Navigation</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Navigate questions</span>
                      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">↑ / ↓</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Open/close question</span>
                      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">Enter / Space</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Switch category</span>
                      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">
                        1-{faqCategories.length}
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Search</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Focus search</span>
                      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">/</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Clear search</span>
                      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">Esc</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Other</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Show this dialog</span>
                      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">?</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Close all questions</span>
                      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">Esc</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowKeyboardShortcuts(false)}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
