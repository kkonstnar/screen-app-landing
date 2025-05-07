import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
        <p className="mt-4 text-lg text-gray-600">Loading press information...</p>
      </div>
    </div>
  )
}
