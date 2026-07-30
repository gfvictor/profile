'use server'

import { z } from 'zod'
import { MailtrapClient } from 'mailtrap'
import { headers } from 'next/headers'

const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_WINDOW_MS = 60000
const MAX_REQUESTS = 3

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
  _pegatrouxa: z.string().optional(),
})

export async function sendEmailAction(formData: FormData) {
  const ip = (await headers()).get('x-forwarded-for') || 'unknown'
  const now = Date.now()
  const timestamps = rateLimitMap.get(ip) || []
  const recentRequests = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)

  if (recentRequests.length >= MAX_REQUESTS) {
    console.warn(`Rate limit exceeded for IP: ${ip}`)
    return { error: 'Muitas requisições. Tente novamente mais tarde.' }
  }

  recentRequests.push(now)
  rateLimitMap.set(ip, recentRequests)

  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    _pegatrouxa: formData.get('_pegatrouxa') ?? undefined,
  }

  const validatedFields = contactSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { name, email, message, _pegatrouxa } = validatedFields.data

  if (_pegatrouxa) {
    console.warn('Bot trapped in honeypot:', { name, email })
    return { success: true }
  }

  const MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN || ''

  if (!MAILTRAP_TOKEN) {
    await new Promise((r) => setTimeout(r, 1000))
    console.warn('Mailtrap Sandbox - Message received: ', { name, email, message })
    return { success: true, simulated: true }
  }

  const client = new MailtrapClient({ token: MAILTRAP_TOKEN })

  const sender = {
    email: 'hello@codifylab.online',
    name: 'Portfolio Lead',
  }

  const recipients = [{ email: 'contact@codifylab.online' }]

  try {
    await client.send({
      from: sender,
      to: recipients,
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    })

    return { success: true }
  } catch (error) {
    console.error('Email error:', error)
    return { error: 'Failed to send message' }
  }
}
