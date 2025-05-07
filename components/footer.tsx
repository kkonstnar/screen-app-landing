import Link from "next/link"
import { MapPin, Twitter, Youtube, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white py-16 border-t border-gray-100 flex justify-center">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info Column */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-4">ScreenApp</h2>
            <div className="flex items-center text-gray-600 mb-6">
              <MapPin className="h-4 w-4 mr-2" />
              <span>San Francisco, CA</span>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mb-4">
              <Link href="https://twitter.com" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://youtube.com" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link href="https://linkedin.com" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://instagram.com" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>

            <div className="text-gray-500 text-sm">© {new Date().getFullYear()} ScreenApp</div>
          </div>

          {/* For Companies Column */}
          <div className="lg:col-span-1">
            <h3 className="font-medium mb-4">For employers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/find-talent" className="text-gray-600 hover:text-black transition-colors">
                  Find talent
                </Link>
              </li>
              <li>
                <Link href="/post-jobs" className="text-gray-600 hover:text-black transition-colors">
                  Post jobs
                </Link>
              </li>
              <li>
                <Link href="/screening" className="text-gray-600 hover:text-black transition-colors">
                  Screening
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-gray-600 hover:text-black transition-colors">
                  Team
                </Link>
              </li>
            </ul>

            <h3 className="font-medium mt-6 mb-4">Candidate data</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guide" className="text-gray-600 hover:text-black transition-colors">
                  Guide
                </Link>
              </li>
              <li>
                <Link href="/process" className="text-gray-600 hover:text-black transition-colors">
                  Process
                </Link>
              </li>
              <li>
                <Link href="/data-pipelines" className="text-gray-600 hover:text-black transition-colors">
                  Data pipelines
                </Link>
              </li>
              <li>
                <Link href="/incentives" className="text-gray-600 hover:text-black transition-colors">
                  Incentives
                </Link>
              </li>
            </ul>
          </div>

          {/* For Candidates Column */}
          <div className="lg:col-span-1">
            <h3 className="font-medium mb-4">For job seekers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/apply" className="text-gray-600 hover:text-black transition-colors">
                  Apply
                </Link>
              </li>
              <li>
                <Link href="/opportunities" className="text-gray-600 hover:text-black transition-colors">
                  Opportunities
                </Link>
              </li>
              <li>
                <Link href="/mock-interviews" className="text-gray-600 hover:text-black transition-colors">
                  Mock interviews
                </Link>
              </li>
              <li>
                <Link href="/resume-feedback" className="text-gray-600 hover:text-black transition-colors">
                  Resume feedback
                </Link>
              </li>
              <li>
                <Link href="/salary-info" className="text-gray-600 hover:text-black transition-colors">
                  Salary info
                </Link>
              </li>
            </ul>

            <h3 className="font-medium mt-6 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@screenapp.com" className="text-gray-600 hover:text-black transition-colors">
                  support@screenapp.com
                </a>
              </li>
              <li>
                <a href="mailto:press@screenapp.com" className="text-gray-600 hover:text-black transition-colors">
                  press@screenapp.com
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="lg:col-span-1">
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-black transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-black transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="text-gray-600 hover:text-black transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-gray-600 hover:text-black transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-600 hover:text-black transition-colors">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/job-seeker-terms" className="text-gray-600 hover:text-black transition-colors">
                  Job seeker terms
                </Link>
              </li>
              <li>
                <Link href="/employer-terms" className="text-gray-600 hover:text-black transition-colors">
                  Employer terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
