import { GoogleGenerativeAI } from '@google/generative-ai'
import { search, type HousehelpRecord } from './rag'

const GEMINI_KEY = process.env.GEMINI_API_KEY ?? ''

const SYSTEM_PROMPT = `You are Snabbit, a friendly WhatsApp booking assistant for home services in Bangalore.

You have access to a real database of 5000+ househelp records across 20 Bangalore localities.
When answering, always reference specific records from the database with actual prices, availability, and experience.

Rules:
- Be concise (WhatsApp messages should be short, under 200 words)
- Always mention real prices from the database (₹/month or ₹/hour)
- If asked about availability, reference the actual status (Immediate, Available this week, etc.)
- For booking requests, guide them to pick a service and area
- Never make up data — only use what's in the retrieved context
- Use Indian English, friendly tone
- Use emojis sparingly (1-2 per message)
- End with a CTA like "Want me to book one?" or "Shall I check availability?"
- If the user asks about a service not in the database, say so honestly
- If multiple options exist, list the top 3-4 best matches`

let genAI: GoogleGenerativeAI | null = null
let model: ReturnType<GoogleGenerativeAI['getGenerativeModel']> | null = null

export function initGemini(): boolean {
  if (!GEMINI_KEY) {
    console.log('[gemini] No GEMINI_API_KEY set — LLM responses disabled, using keyword fallback')
    return false
  }
  genAI = new GoogleGenerativeAI(GEMINI_KEY)
  model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
  console.log('[gemini] Initialized with gemini-2.0-flash')
  return true
}

export function isGeminiReady(): boolean {
  return model !== null
}

function formatContext(records: HousehelpRecord[]): string {
  if (records.length === 0) return 'No matching records found in the database.'

  const lines = records.map(
    (r, i) =>
      `[${i + 1}] ${r.serviceType} | ${r.locality} | ${r.workType} | ₹${r.pricingMonthly}/mo | ${r.hoursPerDay}hrs/day | ${r.experienceYears}yr exp | ${r.availability} | ${r.verifiedStatus} | ${r.preferredShift}`,
  )

  return `Here are the matching records from the database:\n${lines.join('\n')}`
}

export async function queryGemini(userMessage: string, topK = 5, localityFilter?: string): Promise<string> {
  if (!model) {
    const result = search(userMessage, topK, localityFilter)
    if (result.records.length === 0) {
      return "I couldn't find matching records. Could you tell me your area and what service you need?"
    }
    return `Here are some options:\n\n${result.summary}\n\nWant me to book one?`
  }

  const result = search(userMessage, topK, localityFilter)
  const context = formatContext(result.records)

  const prompt = `${SYSTEM_PROMPT}\n\n---\n\nUser message: ${userMessage}\n\nDatabase context:\n${context}\n\nYour response (concise, WhatsApp-friendly):`

  try {
    const response = await model.generateContent(prompt)
    const text = response.response.text()
    return text || "I'm not sure how to help with that. Could you rephrase?"
  } catch (err) {
    console.error('[gemini] API error:', err)
    if (result.records.length > 0) {
      return `Here are some options:\n\n${result.summary}\n\nWant me to book one?`
    }
    return "I'm having trouble right now. Could you try again?"
  }
}
