"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Monitor, Smartphone, Keyboard, X, ArrowLeft, ArrowRight, Pause, Play } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const animationStyles = `
  @keyframes p-key-pulse {
    0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); transform: scale(1); }
    50% { box-shadow: 0 0 0 15px rgba(59, 130, 246, 0); transform: scale(1.03); }
    100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); transform: scale(1); }
  }
  
  .animate-p-key-press {
    animation: p-key-pulse 0.6s ease-out;
  }

  @keyframes fadeInUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes fadeOutDown {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(20px); opacity: 0; }
  }

  @keyframes fadeInDown {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes fadeOutUp {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(-20px); opacity: 0; }
  }

  .fade-in-up {
    animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .fade-out-down {
    animation: fadeOutDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .fade-in-down {
    animation: fadeInDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .fade-out-up {
    animation: fadeOutUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
`

export default function HeroSection() {
  const phoneRef = useRef<HTMLDivElement>(null)
  const [currentScreen, setCurrentScreen] = useState(0)
  const [previousScreen, setPreviousScreen] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false)
  const [focusedElement, setFocusedElement] = useState<string | null>(null)
  const autoRotateIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const screenButtonsRef = useRef<(HTMLButtonElement | null)[]>([])
  const [transitionDirection, setTransitionDirection] = useState<"next" | "prev">("next")

  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const gotItButtonRef = useRef<HTMLButtonElement>(null)
  const lastFocusedElementRef = useRef<HTMLElement | null>(null)

  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)
  const [isSwiping, setIsSwiping] = useState(false)
  const swipeThreshold = 50
  const [isPKeyPressed, setIsPKeyPressed] = useState(false)

  const phoneScreens = [
    {
      id: "signup",
      title: "Signup",
      image: "/signup.png?key=phone-signup&text=Signup Screen",
    },
    {
      id: "screen",
      title: "Screen",
      image: "/screen.png?key=phone-screen&text=Screen Verification",
    },
    {
      id: "gq-test",
      title: "GQ Test",
      image: "/gq.png?key=phone-gq-test&text=GQ Test Screen",
    },
    {
      id: "job-matches",
      title: "Job Matches",
      image: "/done.png?key=phone-matches&text=Job Matches Screen",
    },
  ]

  const toggleAutoRotation = () => {
    setIsAutoRotating((prev) => !prev)
  }

  const openKeyboardShortcuts = () => {
    lastFocusedElementRef.current = document.activeElement as HTMLElement
    document.body.style.overflow = "hidden"
    setShowKeyboardShortcuts(true)
  }

  const closeKeyboardShortcuts = () => {
    document.body.style.overflow = ""
    setShowKeyboardShortcuts(false)
    setTimeout(() => {
      lastFocusedElementRef.current?.focus()
    }, 300)
  }

  const triggerPKeyAnimation = () => {
    setIsPKeyPressed(true)
    setTimeout(() => {
      setIsPKeyPressed(false)
    }, 600)
  }

  const focusPhone = () => {
    setFocusedElement("phone")
    screenButtonsRef.current[0]?.focus()
    phoneRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
    triggerPKeyAnimation()
  }

  const goToNextScreen = () => {
    setPreviousScreen(currentScreen)
    setTransitionDirection("next")
    setCurrentScreen((prev) => (prev + 1) % phoneScreens.length)
  }

  const goToPrevScreen = () => {
    setPreviousScreen(currentScreen)
    setTransitionDirection("prev")
    setCurrentScreen((prev) => (prev - 1 + phoneScreens.length) % phoneScreens.length)
  }

  const goToScreen = (index: number) => {
    setPreviousScreen(currentScreen)
    setTransitionDirection(index > currentScreen ? "next" : "prev")
    setCurrentScreen(index)
    setFocusedElement("phone")
  }

  useEffect(() => {
    const phone = phoneRef.current
    if (!phone) return

    let startTime = 0
    let animationFrameId: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      const yMovement = Math.sin(elapsed / 1000) * 6
      const xMovement = Math.sin(elapsed / 1500) * 3

      phone.style.transform = `translate(${xMovement}px, ${yMovement}px)`

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    const startAutoRotate = () => {
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current)
      }

      if (isAutoRotating) {
        autoRotateIntervalRef.current = setInterval(() => {
          goToNextScreen()
        }, 3000)
      }
    }

    startAutoRotate()

    const handlePhoneHover = () => {
      setIsAutoRotating(false)
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current)
      }
    }

    const handlePhoneLeave = () => {
      setIsAutoRotating(true)
      startAutoRotate()
    }

    if (phone) {
      phone.addEventListener("mouseenter", handlePhoneHover)
      phone.addEventListener("mouseleave", handlePhoneLeave)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showKeyboardShortcuts) {
        e.preventDefault()
        closeKeyboardShortcuts()
        return
      }

      if (showKeyboardShortcuts) {
        return
      }

      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      if (e.key === "?" && !showKeyboardShortcuts) {
        e.preventDefault()
        openKeyboardShortcuts()
        return
      }

      if (e.key === " " && focusedElement === "phone") {
        e.preventDefault()
        toggleAutoRotation()
        return
      }

      if (focusedElement === "phone") {
        if (e.key === "ArrowRight" || e.key === "Enter") {
          e.preventDefault()
          goToNextScreen()
        } else if (e.key === "ArrowLeft") {
          e.preventDefault()
          goToPrevScreen()
        } else if (e.key === "Escape") {
          e.preventDefault()
          setFocusedElement(null)
          document.body.focus()
        }
      }

      if (e.key === "p") {
        e.preventDefault()
        focusPhone()
      }

      if (e.key === " " && !focusedElement) {
        e.preventDefault()
        toggleAutoRotation()
      }

      const num = Number.parseInt(e.key)
      if (!isNaN(num) && num >= 1 && num <= phoneScreens.length) {
        e.preventDefault()
        goToScreen(num - 1)
        screenButtonsRef.current[num - 1]?.focus()
      }

      if (e.key === "Home") {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: "smooth" })
      }

      if (e.key === "End") {
        e.preventDefault()
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      cancelAnimationFrame(animationFrameId)
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current)
      }
      if (phone) {
        phone.removeEventListener("mouseenter", handlePhoneHover)
        phone.removeEventListener("mouseleave", handlePhoneLeave)
      }
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isAutoRotating, phoneScreens.length, focusedElement, showKeyboardShortcuts])

  useEffect(() => {
    if (!showKeyboardShortcuts) return

    const focusTimer = setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 300)

    const trapFocus = (e: KeyboardEvent) => {
      if (!modalRef.current || e.key !== "Tab") return

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )

      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      }
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener("keydown", trapFocus)

    return () => {
      document.removeEventListener("keydown", trapFocus)
      clearTimeout(focusTimer)
    }
  }, [showKeyboardShortcuts])

  const handleSwipe = () => {
    if (!touchStartX || !touchEndX) return

    const swipeDistance = touchEndX - touchStartX

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        goToPrevScreen()
      } else {
        goToNextScreen()
      }
    }

    setTouchStartX(null)
    setTouchEndX(null)
    setIsSwiping(false)
  }

  const titleAnimation = useScrollAnimation()
  const descAnimation = useScrollAnimation({ threshold: 0.05 })
  const buttonsAnimation = useScrollAnimation({ threshold: 0.05 })

  const getScreenTransitionClasses = (index: number) => {
    if (currentScreen === index) {
      return "fade-in-up"
    } else if (previousScreen === index) {
      return "fade-out-down"
    }
    return "opacity-0"
  }

  return (
    <section
      className="pt-32 md:pt-40 pb-32 md:pb-40 bg-gradient-to-b from-blue-50 to-white relative min-h-screen flex flex-col justify-center"
      id="phone-section"
    >
      <style>{animationStyles}</style>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
          {(() => {
            return (
              <>
                <h1
                  ref={titleAnimation.ref}
                  className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-700 ${
                    titleAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  Get hired before you get home
                </h1>
                <p
                  ref={descAnimation.ref}
                  className={`text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto transition-all duration-700 ${
                    descAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: "100ms" }}
                >
                  Connecting top engineering talent with Fortune 500 companies. Our AI matching delivers 60% faster
                  hiring and 45% better retention rates than traditional recruiting.
                </p>

                <div
                  ref={buttonsAnimation.ref}
                  className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ${
                    buttonsAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: "200ms" }}
                >
                  <Link
                    href="/download/ios"
                    className="bg-black text-white rounded-full px-4 py-2 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-900 transition-all hover:scale-105 transform"
                  >
                    <Monitor className="h-4 w-4" />
                    <span>Find Jobs Now</span>
                  </Link>
                  <Link
                    href="/whats-next"
                    className="bg-white bg-opacity-20 text-black border border-gray-400 rounded-full px-4 py-2 text-sm font-medium flex items-center justify-center gap-2 hover:bg-opacity-30 transition-all backdrop-blur-md shadow-lg hover:scale-105 transform"
                    style={{
                      backdropFilter: "blur(12px)",
                      background: "rgba(255, 255, 255, 0.7)",
                      boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Smartphone className="h-4 w-4" />
                    <span>For Employers</span>
                  </Link>
                </div>
              </>
            )
          })()}
        </div>

        <div className="max-w-md mx-auto opacity-0 animate-[fadeIn_1s_ease-out_0.8s_forwards] relative pb-16">
          <div className="absolute -top-12 left-0 right-0 flex items-center justify-center gap-2 text-gray-500 text-sm mb-6">
            <button
              onClick={openKeyboardShortcuts}
              className="flex items-center justify-center gap-1 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 rounded-md p-1"
              aria-label="Show keyboard shortcuts"
            >
              <Keyboard className="h-4 w-4" />
              <span>Keyboard shortcuts</span>
            </button>
          </div>

          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => {
                goToPrevScreen()
                setFocusedElement("phone")
              }}
              className={`p-2 rounded-full ${
                focusedElement === "phone"
                  ? "text-blue-600 hover:bg-blue-50"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400`}
              aria-label="Previous screen"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className={`text-sm font-medium ${focusedElement === "phone" ? "text-blue-600" : "text-gray-500"}`}>
                {currentScreen + 1} / {phoneScreens.length}
              </div>

              <button
                onClick={toggleAutoRotation}
                className={`p-1.5 rounded-full ${
                  isAutoRotating
                    ? "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400`}
                aria-label={isAutoRotating ? "Pause auto-rotation" : "Resume auto-rotation"}
                title={isAutoRotating ? "Pause (Space)" : "Play (Space)"}
              >
                {isAutoRotating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
            </div>

            <button
              onClick={() => {
                goToNextScreen()
                setFocusedElement("phone")
              }}
              className={`p-2 rounded-full ${
                focusedElement === "phone"
                  ? "text-blue-600 hover:bg-blue-50"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400`}
              aria-label="Next screen"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div
            ref={phoneRef}
            className={`relative mx-auto transition-transform duration-1000 ease-in-out ${
              focusedElement === "phone" ? "ring-2 ring-blue-400 ring-offset-2 rounded-[44px]" : ""
            } ${isPKeyPressed ? "animate-p-key-press" : ""}`}
            style={{ maxWidth: "280px" }}
            onClick={() => focusPhone()}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setFocusedElement("phone")
              }
            }}
            aria-label="Phone preview, use arrow keys to navigate screens"
            onTouchStart={(e) => {
              setTouchStartX(e.touches[0].clientX)
              setIsSwiping(true)
            }}
            onTouchMove={(e) => {
              if (touchStartX) {
                setTouchEndX(e.touches[0].clientX)
              }
            }}
            onTouchEnd={() => {
              handleSwipe()
            }}
            onTouchCancel={() => {
              setTouchStartX(null)
              setTouchEndX(null)
              setIsSwiping(false)
            }}
          >
            {!isAutoRotating && (
              <div className="absolute -top-3 -right-3 z-20 bg-blue-600 text-white rounded-full p-1.5 shadow-lg">
                <Pause className="h-3.5 w-3.5" />
              </div>
            )}

            <div
              className={`relative rounded-[44px] overflow-hidden border-[6px] border-black shadow-xl transition-all duration-300 ${
                isSwiping ? "cursor-grabbing" : ""
              }`}
              style={{
                aspectRatio: "9/19.5",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-8 bg-black z-30 flex justify-center">
                <div className="w-[30%] h-7 bg-black rounded-b-3xl absolute top-0 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#1a1a1a] mr-12"></div>
                  <div className="w-2 h-2 rounded-full bg-[#1a1a1a]"></div>
                </div>
              </div>

              <div className="absolute top-1 left-0 right-0 h-6 z-20 flex justify-between items-center px-6">
                <div className="text-white text-xs font-medium">9:41</div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-2 bg-white rounded-sm"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="absolute inset-0 overflow-hidden">
                {phoneScreens.map((screen, index) => (
                  <div
                    key={screen.id}
                    className={`absolute inset-0 z-10 pt-10 ${getScreenTransitionClasses(index)}`}
                    style={{
                      willChange: "transform, opacity",
                      transformOrigin: "center center",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <Image
                      src={screen.image || "/placeholder.svg"}
                      alt={`ScreenApp ${screen.title}`}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ))}
              </div>

              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-white rounded-full"></div>
            </div>

            <div className="absolute top-20 -right-2 w-2 h-8 bg-gray-800 rounded-r-lg"></div>
            <div className="absolute top-32 -right-2 w-2 h-12 bg-gray-800 rounded-r-lg"></div>
            <div className="absolute top-16 -left-2 w-2 h-8 bg-gray-800 rounded-l-lg"></div>

            <div
              className="absolute inset-0 rounded-[44px] pointer-events-none"
              style={{
                background: "linear-gradient(130deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 30%)",
                border: "6px solid transparent",
              }}
            ></div>
            {isSwiping && touchStartX && touchEndX && (
              <div
                className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center"
                aria-hidden="true"
              >
                <div
                  className={`text-white bg-black bg-opacity-50 rounded-full p-3 transform transition-transform ${
                    touchEndX - touchStartX > 0 ? "translate-x-4" : "-translate-x-4"
                  }`}
                >
                  {touchEndX - touchStartX > 0 ? <ArrowLeft className="h-6 w-6" /> : <ArrowRight className="h-6 w-6" />}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {phoneScreens.map((_, index) => (
              <button
                key={index}
                ref={(el) => {
                  screenButtonsRef.current[index] = el;
                }}
                className={`w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
                  currentScreen === index ? "bg-blue-600 w-6" : "bg-gray-300 focus:bg-gray-400 hover:bg-gray-400"
                } ${focusedElement === "phone" && currentScreen === index ? "ring-2 ring-blue-300 ring-offset-2" : ""}`}
                onClick={() => goToScreen(index)}
                onFocus={() => {
                  setFocusedElement("phone")
                  setCurrentScreen(index)
                }}
                aria-label={`View screen ${index + 1}: ${phoneScreens[index].title}`}
                aria-current={currentScreen === index ? "true" : "false"}
              />
            ))}
          </div>

          <div className="text-center mt-4 space-y-1">
            <p className={`font-medium text-lg ${focusedElement === "phone" ? "text-blue-600" : "text-gray-800"}`}>
              {phoneScreens[currentScreen].title}
            </p>
            <p className="text-sm text-gray-500">
              {currentScreen === 0 && "Create your account and start your journey"}
              {currentScreen === 1 && "Complete ID and KYC verification, select team type and location"}
              {currentScreen === 2 && "Take our Genius Quotient assessment to showcase your skills"}
              {currentScreen === 3 && "Discover job opportunities perfectly matched to your profile"}
            </p>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              Press <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded-md font-mono text-xs">P</kbd>{" "}
              to focus the phone, then use arrow keys to navigate
            </p>
            <p className="mt-1">
              Press{" "}
              <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded-md font-mono text-xs">Space</kbd> to{" "}
              {isAutoRotating ? "pause" : "resume"} auto-rotation
            </p>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500 md:hidden">
            <p>Swipe left or right to navigate between screens</p>
          </div>
        </div>
      </div>

      {showKeyboardShortcuts && (
        <div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4 transition-all duration-300 ease-in-out"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
            opacity: showKeyboardShortcuts ? 1 : 0,
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="keyboard-shortcuts-title"
          onClick={closeKeyboardShortcuts}
        >
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 transition-all duration-300 ease-in-out transform"
            style={{
              opacity: showKeyboardShortcuts ? 1 : 0,
              transform: showKeyboardShortcuts ? "scale(1) translateY(0)" : "scale(0.95) translateY(10px)",
            }}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 id="keyboard-shortcuts-title" className="text-xl font-bold flex items-center gap-2">
                <Keyboard className="h-5 w-5" />
                Keyboard Shortcuts
              </h2>
              <button
                ref={closeButtonRef}
                onClick={closeKeyboardShortcuts}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full p-1 transition-colors duration-200"
                aria-label="Close keyboard shortcuts"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Phone Navigation</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Focus phone</span>
                    <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">P</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Next/previous screen</span>
                    <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">← / →</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Go to specific screen</span>
                    <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">1-{phoneScreens.length}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Pause/resume rotation</span>
                    <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">Space</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Exit phone focus</span>
                    <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">Esc</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-2">Page Navigation</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Go to top of page</span>
                    <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">Home</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Go to bottom of page</span>
                    <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">End</span>
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
                    <span className="text-gray-600">Close this dialog</span>
                    <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">Esc</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                ref={gotItButtonRef}
                onClick={closeKeyboardShortcuts}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
