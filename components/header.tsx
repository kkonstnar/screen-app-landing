"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Monitor, Smartphone } from "lucide-react"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [forcePreview, setForcePreview] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (forcePreview) return

      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled, forcePreview])

  // Toggle between scrolled and non-scrolled states for preview
  const togglePreview = () => {
    setForcePreview(!forcePreview)
    setScrolled(!scrolled)
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 py-4 w-full"
        style={{
          backgroundColor: "transparent",
          willChange: "transform",
        }}
      >
        <div className="container mx-auto px-4 flex justify-center">
          <div
            className="flex items-center justify-between"
            style={{
              maxWidth: scrolled ? "fit-content" : "100%",
              backgroundColor: scrolled ? "rgba(255, 255, 255, 0.9)" : "transparent",
              backdropFilter: scrolled ? "blur(8px)" : "none",
              boxShadow: scrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)" : "none",
              borderRadius: scrolled ? "9999px" : "0px",
              padding: scrolled ? "0.5rem 1rem" : "1rem 2rem",
              transition: "all 700ms cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "transform, opacity, background-color, max-width, border-radius, box-shadow, padding",
            }}
          >
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center gap-2"
                style={{
                  marginRight: scrolled ? "0.75rem" : "3rem",
                  transition: "all 700ms cubic-bezier(0.16, 1, 0.3, 1)",
                  willChange: "transform, margin",
                }}
              >
                <div className="bg-black rounded-lg p-2">
                  <Monitor className="h-5 w-5 text-white" />
                </div>
                <span
                  className="text-xl font-bold"
                  style={{
                    opacity: scrolled ? 0 : 1,
                    maxWidth: scrolled ? "0" : "200px",
                    overflow: "hidden",
                    transition: "all 700ms cubic-bezier(0.16, 1, 0.3, 1)",
                    willChange: "opacity, max-width",
                  }}
                >
                  ScreenApp
                </span>
              </Link>

              <div
                className="h-6 w-px bg-gray-300"
                style={{
                  opacity: scrolled ? 1 : 0,
                  maxWidth: scrolled ? "1px" : "0",
                  marginLeft: scrolled ? "0.5rem" : "0",
                  marginRight: scrolled ? "0.5rem" : "0",
                  transition: "all 700ms cubic-bezier(0.16, 1, 0.3, 1)",
                  willChange: "opacity, max-width, margin",
                }}
              ></div>
            </div>

            <nav
              className="hidden md:flex items-center"
              style={{
                gap: scrolled ? "1.25rem" : "2.5rem",
                marginLeft: scrolled ? "2rem" : "4rem",
                marginRight: scrolled ? "2rem" : "4rem",
                transition: "all 700ms cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "gap, margin",
              }}
            >
              <Link href="/whats-next" className="text-gray-700 hover:text-black transition-colors duration-300">
                What's Next
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-black transition-colors duration-300">
                About
              </Link>
              <Link href="/press" className="text-gray-700 hover:text-black transition-colors duration-300">
                Press
              </Link>
              <Link href="/support" className="text-gray-700 hover:text-black transition-colors duration-300">
                Support
              </Link>
            </nav>

            <Link
              href="/download"
              className="bg-black text-white rounded-full px-4 py-2 flex items-center gap-2 hover:bg-gray-800"
              style={{
                marginLeft: scrolled ? "2rem" : "4rem",
                transition: "all 700ms cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "margin, transform",
              }}
            >
              <span>Get the app</span>
              <Smartphone className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
