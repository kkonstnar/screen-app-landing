"use client"

import { useState } from "react"
import Link from "next/link"
import { Plane } from "lucide-react"

export default function HeaderPreview() {
  const [scrolled, setScrolled] = useState(false)

  return (
    <div className="space-y-12 p-8">
      <div className="flex justify-center">
        <button onClick={() => setScrolled(!scrolled)} className="bg-black text-white rounded-full px-4 py-2">
          Toggle Header State
        </button>
      </div>

      <div className="border p-8 rounded-lg">
        <h2 className="text-xl font-bold mb-4">{scrolled ? "Scrolled Header" : "Default Header"}</h2>
        <div
          className="py-4 w-full transition-all duration-500 ease-in-out"
          style={{
            backgroundColor: scrolled ? "white" : "transparent",
          }}
        >
          <div className="container mx-auto px-4 flex justify-center">
            <div
              className="flex items-center justify-between transition-all duration-500 ease-in-out"
              style={{
                maxWidth: scrolled ? "fit-content" : "100%",
                backgroundColor: scrolled ? "rgba(255, 255, 255, 0.9)" : "transparent",
                backdropFilter: scrolled ? "blur(8px)" : "none",
                boxShadow: scrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)" : "none",
                borderRadius: scrolled ? "9999px" : "0px",
                padding: scrolled ? "0.5rem 1rem" : "0",
              }}
            >
              <Link
                href="/"
                className="flex items-center gap-2 transition-all duration-500 ease-in-out"
                style={{
                  marginRight: scrolled ? "1rem" : "2rem",
                }}
              >
                <div className="bg-black rounded-lg p-2">
                  <Plane className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Flighty</span>
              </Link>

              <nav
                className="hidden md:flex items-center transition-all duration-500 ease-in-out"
                style={{
                  gap: scrolled ? "1.25rem" : "2rem",
                }}
              >
                <Link href="/pricing" className="text-gray-700 hover:text-black transition-colors">
                  Pricing
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-black transition-colors">
                  About
                </Link>
                <Link href="/press" className="text-gray-700 hover:text-black transition-colors">
                  Press
                </Link>
                <Link href="/support" className="text-gray-700 hover:text-black transition-colors">
                  Support
                </Link>
              </nav>

              <Link
                href="/download"
                className="bg-black text-white rounded-full px-4 py-2 flex items-center gap-2 hover:bg-gray-800 transition-all duration-500 ease-in-out"
                style={{
                  marginLeft: scrolled ? "1rem" : "2rem",
                }}
              >
                <span>Get the app</span>
                <span className="border border-white rounded-md p-0.5">📱</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
