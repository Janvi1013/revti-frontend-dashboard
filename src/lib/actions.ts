'use server'

import { createClient } from '@supabase/supabase-js'

export type EnquiryData = {
  name: string
  email: string
  phone?: string
  company?: string
  services: string[]
  message?: string
}

export type ActionResult = {
  success: boolean
  error?: string
}

export async function submitEnquiry(data: EnquiryData): Promise<ActionResult> {
  'use server'

  if (!data.name || !data.email) {
    return { success: false, error: 'Name and email are required.' }
  }
  if (data.services.length === 0) {
    return { success: false, error: 'Please select at least one service.' }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase env vars not set')
    return { success: false, error: 'Server configuration error.' }
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  const { error } = await supabase.from('enquiries').insert({
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone?.trim() || null,
    company: data.company?.trim() || null,
    services: data.services,
    message: data.message?.trim() || null,
  })

  if (error) {
    console.error('Supabase insert error:', error)
    return { success: false, error: 'Failed to submit. Please try again.' }
  }

  return { success: true }
}
