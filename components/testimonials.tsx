"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Star, Plus } from "lucide-react"

const testimonials = [
  {
    name: "David Pogue",
    handle: "@Pogue",
    avatar: "/placeholder.svg?key=avatar1",
    content:
      "Ever since LinkedIn became too crowded, I've searched for the ultimate job-finding app. Now I've found it: @ScreenApp. Beautiful, clear, useful info (even tracks the hiring manager's response time). Often tells me about opportunities before they're publicly posted!",
    date: "",
    stars: 0,
  },
  {
    name: "Great hiring app!",
    handle: "by BigPlayaz",
    avatar: "",
    content:
      "If you're job hunting at all, ScreenApp is amazing. It really does get updates on job openings faster than what you'll get from traditional job boards. The app itself is so clearly built with care, attention to detail, and skill. All the extra info on your application status is great as well.",
    date: "Sep 7, 2024",
    stars: 5,
  },
  {
    name: "Parker Ortolani",
    handle: "@ParkerOrtolani",
    avatar: "/placeholder.svg?key=avatar2",
    content: "@ScreenApp is one of the most well thought out and well executed job search apps I've ever seen.",
    date: "",
    stars: 0,
  },
  {
    name: "Favorite app on my phone",
    handle: "a.czarnik",
    avatar: "",
    content:
      "It's like the old Apple motto: It just works. It does exactly what it needs to, nothing more, and it does it all flawlessly. It's genuinely my favorite app on my phone. Literal perfection. No notes. Now, if only every other job search app worked as well as ScreenApp.",
    date: "Aug 20, 2024",
    stars: 5,
  },
  {
    name: "Joel",
    handle: "ScreenApp Crew",
    avatar: "/placeholder.svg?key=avatar3",
    content:
      "Two weeks ago, I was desperately looking for a new position after a layoff. At 7:30 am, ScreenApp alerted me to a perfect match at a company I'd been following. The job wasn't even posted on their website yet, but I could see it was coming. I applied immediately and had an interview by lunch.",
    date: "Jan 31, 2023",
    stars: 0,
    to: "To:",
  },
  {
    name: "Essential Job Search App",
    handle: "Doc Ricardo",
    avatar: "",
    content:
      "I'm a 20+ year tech veteran, and this app is essential for navigating the complexities of today's job market. Traditional job boards are slow to update, but ScreenApp keeps you ahead. Forewarned is forearmed—this app equips you with the info you need to handle inevitable interview challenges. Absolutely worth the annual fee.",
    date: "Jan 4, 2023",
    stars: 5,
  },
  {
    name: "Hendrik Haandrikman",
    handle: "@HHaandr",
    avatar: "/placeholder.svg?key=avatar4",
    content:
      "Signed up for @ScreenApp in an ongoing job search, and the very first position I applied for through it was a perfect match. They let me know about the hiring manager's interest 30m (!) before the recruiter reached out, which meant that I was fully prepared for the call.",
    date: "",
    stars: 0,
  },
]

export default function Testimonials() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(Array(testimonials.length + 1).fill(false))
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardsRef.current.findIndex((card) => card === entry.target)
            if (index !== -1) {
              setVisibleCards((prev) => {
                const newState = [...prev]
                newState[index] = true
                return newState
              })
              observer.unobserve(entry.target)
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card)
      })
    }
  }, [])

  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 max-w-4xl mx-auto leading-tight">
          From entry-level to executives, people love ScreenApp.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`border border-gray-200 rounded-lg p-6 transition-all duration-700 ease-out hover:shadow-lg hover:-translate-y-1 ${
                visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start mb-4">
                {testimonial.avatar ? (
                  <div className="mr-3 flex-shrink-0">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </div>
                ) : null}
                <div>
                  <h3 className="font-bold text-lg">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.handle}</p>
                </div>
                {testimonial.date && <div className="ml-auto text-sm text-gray-500">{testimonial.date}</div>}
              </div>

              {testimonial.stars > 0 && (
                <div className="flex text-amber-400 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5" fill={i < testimonial.stars ? "currentColor" : "none"} />
                  ))}
                </div>
              )}

              {testimonial.to && <div className="text-gray-500 mb-1">{testimonial.to}</div>}

              <p className="text-gray-700">{testimonial.content}</p>
            </div>
          ))}

          {/* Featured video testimonial */}
          <div
            ref={(el) => (cardsRef.current[testimonials.length] = el)}
            className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-700 ease-out hover:shadow-lg hover:-translate-y-1 ${
              visibleCards[testimonials.length] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${testimonials.length * 100}ms` }}
          >
            <div className="relative">
              <Image
                src="/placeholder.svg?key=video-thumbnail"
                alt="Brian Kelly testimonial"
                width={400}
                height={300}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg text-sm">
                  My new obsession @screenapp
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center">
                <div className="mr-3">
                  <Image
                    src="/placeholder.svg?key=brian-kelly"
                    alt="Brian Kelly"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-bold">Brian Kelly</h3>
                  <p className="text-gray-600 text-sm">@thepointsguy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Million users banner with blue glow */}
        <div className="flex justify-center mt-16">
          <div
            className="bg-black text-white rounded-full py-3 px-6 flex items-center gap-4 cursor-pointer transition-all duration-300 hover:-translate-y-1"
            style={{
              boxShadow: "0 0 20px 5px rgba(0, 149, 255, 0.3), 0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="flex -space-x-2">
              <Image
                src="/placeholder.svg?key=user1"
                alt="User"
                width={32}
                height={32}
                className="rounded-full border-2 border-black"
              />
              <Image
                src="/placeholder.svg?key=user2"
                alt="User"
                width={32}
                height={32}
                className="rounded-full border-2 border-black"
              />
              <Image
                src="/placeholder.svg?key=user3"
                alt="User"
                width={32}
                height={32}
                className="rounded-full border-2 border-black"
              />
            </div>
            <span className="font-medium">+3 million users found jobs with ScreenApp</span>
            <div className="h-6 border-l border-gray-600 mx-1"></div>
            <button className="flex items-center gap-1 hover:text-gray-300 transition-colors">
              View more
              <div className="bg-white bg-opacity-20 rounded-full p-1">
                <Plus className="w-3 h-3" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
