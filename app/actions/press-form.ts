"use server"

import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function submitPressForm(formData: FormData) {
  try {
    // Extract form data
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const publication = formData.get("publication") as string | null

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return {
        success: false,
        message: "First name, last name, and email are required",
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Please enter a valid email address",
      }
    }

    // Insert data into Supabase
    const { error } = await supabase.from("press_subscribers").insert([
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        publication: publication || null, // Publication is optional
        created_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error("Supabase error:", error)
      return {
        success: false,
        message: "Failed to submit form. Please try again later.",
      }
    }

    return {
      success: true,
      message: "Thank you for joining our media list!",
    }
  } catch (error) {
    console.error("Server error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    }
  }
}
