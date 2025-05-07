"use client"

import { useEffect, useRef, useState } from "react"

interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(options: ScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px", once = true } = options
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (once && ref.current) {
              observer.unobserve(ref.current)
            }
          } else if (!once) {
            setIsVisible(false)
          }
        })
      },
      { threshold, rootMargin },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin, once])

  return { ref, isVisible }
}
