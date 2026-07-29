'use server'

import { z } from 'zod'
import { MailtrapClient } from 'mailtrap'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
  _gotcha: z.string().optional(),
})

export async function sendEmailAction(formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    _gotcha: formData.get('_gotcha'),
  }

  const validatedFields = contactSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { name, email, message, _gotcha } = validatedFields.data

  if (_gotcha) {
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
    email: 'hello@codifylab.app',
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
