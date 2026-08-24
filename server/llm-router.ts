import { resolveArea } from '../src/lib/areas'
import { queryGemini } from './gemini'
import { search } from './rag'

const BOOKING_KEYWORDS = [
  /^(hi|hello|hey|namaste|good morning|good evening)/i,
  /^(book|schedule|arrange|set up|arrange)/i,
  /^(clean|dish|kitchen|laundry|bathroom|sofa|ac|pest|paint|plumb|electric|sweep|mop|dust|iron|cook|child|elder)/i,
  /^(1|2|3|4|5|6|7|8|9|10)\s*(hr|hour)/i,
  /^(confirm|yes|no|cancel|change|back|menu|restart|new booking)/i,
  /^(rate|feedback|review)/i,
  /^(tracking|track|status|where)/i,
]

const RAG_KEYWORDS = [
  /^(what|which|how|where|when|who|why|can you|do you|tell me|show me|give me|list|compare|difference|price|cost|rate|charge|cheap|affordable)/i,
  /available|availability|available now|available today|available tomorrow/i,
  /part.?time|full.?time|live.?in|shift|morning|evening|flexible/i,
  /verified|trusted|background.?checked|reference/i,
  /experience|experienced|senior|junior|new/i,
  /recommend|suggestion|best|top|good|better/i,
]

export interface RoutingDecision {
  type: 'booking' | 'rag'
  area?: string
  query?: string
}

export function classifyIntent(text: string): RoutingDecision {
  const trimmed = text.trim()

  if (trimmed.length <= 2) return { type: 'booking' }

  for (const kw of BOOKING_KEYWORDS) {
    if (kw.test(trimmed)) return { type: 'booking' }
  }

  for (const kw of RAG_KEYWORDS) {
    if (kw.test(trimmed)) {
      const area = resolveArea(trimmed)
      return { type: 'rag', area, query: trimmed }
    }
  }

  const area = resolveArea(trimmed)
  if (area) return { type: 'booking' }

  const result = search(trimmed, 1)
  if (result.records.length > 0) {
    return { type: 'rag', query: trimmed }
  }

  return { type: 'booking' }
}

export async function handleRAGQuery(text: string): Promise<string> {
  const area = resolveArea(text)
  return queryGemini(text, 5, area ?? undefined)
}

export function handleRAGQuerySync(text: string): string {
  const area = resolveArea(text)
  const result = search(text, 5, area ?? undefined)

  if (result.records.length === 0) {
    return "I couldn't find matching records. Could you tell me your area and what service you need?"
  }

  const lines = result.records.slice(0, 3).map(
    (r) => `• ${r.serviceType} in ${r.locality} — ₹${r.pricingMonthly}/mo, ${r.experienceYears}yr exp, ${r.availability}`,
  )

  return `Here are some options:\n\n${lines.join('\n')}\n\nWant me to book one?`
}
