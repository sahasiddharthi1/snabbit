import type { BotTurn, Session } from './types'
import { resolveArea, getAreas, randomExpert, getGoogleMapsLink, generateOTP } from './areas'
import { getService } from './catalog'

export function createSession(area?: string): Session {
  return { step: 'greeting', area }
}

function parseService(text: string): string | undefined {
  const lower = text.toLowerCase()
  if (lower.includes('dish')) return 'dishwashing'
  if (lower.includes('kitchen')) return 'kitchen'
  if (lower.includes('full') || lower.includes('house')) return 'fullhouse'
  if (lower.includes('laundry') || lower.includes('iron')) return 'laundry'
  if (lower.includes('bathroom') || lower.includes('toilet')) return 'bathroom'
  if (lower.includes('sofa') || lower.includes('carpet') || lower.includes('couch')) return 'sofa'
  if (lower.includes('ac') || lower.includes('air condition')) return 'ac'
  if (lower.includes('pest') || lower.includes('cockroach') || lower.includes('rat')) return 'pest'
  if (lower.includes('paint') || lower.includes('painting')) return 'painting'
  if (lower.includes('plumb') || lower.includes('leak') || lower.includes('pipe')) return 'plumbing'
  if (lower.includes('electric') || lower.includes('wiring') || lower.includes('switch')) return 'electrical'
  if (lower.includes('deep clean') || lower.includes('deepclean')) return 'deepclean'
  return undefined
}

function parseDuration(text: string): number | undefined {
  const match = text.match(/(\d+)\s*(?:hr|hour)/i)
  return match ? parseInt(match[1]) : undefined
}

function parseRating(text: string): number | undefined {
  const match = text.match(/(\d)/)
  return match ? parseInt(match[1]) : undefined
}

function isYes(text: string): boolean {
  return /^(yes|y|sure|ok|okay|confirm|book|go)$/i.test(text.trim())
}

function isNo(text: string): boolean {
  return /^(no|n|nah|cancel|stop|back)$/i.test(text.trim())
}

function isRestart(text: string): boolean {
  return /^(restart|start over|new booking|menu)$/i.test(text.trim())
}

function isHelp(text: string): boolean {
  return /^(help|options|what can)/i.test(text.trim())
}

function areaList(): string {
  const areas = getAreas()
  const lines = areas.map((a) => `• ${a.name}`)
  return lines.join('\n')
}

export function handleUserInput(session: Session, text: string): { turn: BotTurn; session: Session } {
  if (isRestart(text)) {
    return { turn: { text: `Fresh start! Which area do you need cleaning in?\n\n${areaList()}` }, session: { step: 'greeting' } }
  }

  if (isHelp(text)) {
    return { turn: { text: 'Here are the services:\n\n🍽️ Dishwashing — ₹150/hr\n🧹 Kitchen Deep Clean — ₹180/hr\n🏠 Full House — ₹250/hr\n👕 Laundry — ₹160/hr\n\nJust tell me what you need and your area!' }, session }
  }

  const area = resolveArea(text)
  const service = parseService(text)
  const duration = parseDuration(text)

  switch (session.step) {
    case 'greeting': {
      if (area) {
        if (service && duration) {
          const svc = getService(service)!
          const total = svc.pricePerHour * duration
          return { turn: { text: `Got it — ${svc.name} in ${area}, ${duration} hours.\n\nTotal: ₹${total} (${svc.pricePerHour}/hr × ${duration}h)\n\nShall I confirm?`, buttons: ['Confirm', 'Change service'] }, session: { step: 'confirm', area, service, duration, total } }
        }
        if (service) {
          return { turn: { text: `Great choice! How many hours of ${service}?`, buttons: ['1 hour', '2 hours', '3 hours', '4 hours'] }, session: { step: 'duration', area, service } }
        }
        return { turn: { text: `We're live in ${area}! What service do you need?\n\n🍽️ Dishwashing — ₹150/hr\n🧹 Kitchen Deep Clean — ₹180/hr\n🏠 Full House — ₹250/hr\n👕 Laundry — ₹160/hr`, buttons: ['Dishwashing', 'Kitchen', 'Full House', 'Laundry'] }, session: { step: 'service', area } }
      }
      return { turn: { text: `Hi! 👋 Welcome to Snabbit.\n\nWhich area do you need cleaning in?\n\n${areaList()}` }, session }
    }

    case 'service': {
      if (service) {
        return { turn: { text: `How many hours of ${service}?`, buttons: ['1 hour', '2 hours', '3 hours', '4 hours'] }, session: { ...session, step: 'duration', service } }
      }
      return { turn: { text: "Didn't catch that. Pick a service:" }, session }
    }

    case 'duration': {
      if (duration) {
        const svc = getService(session.service!)!
        const total = svc.pricePerHour * duration
        return { turn: { text: `${svc.name} — ${duration} hours.\n\nTotal: ₹${total}\n\nConfirm booking?`, buttons: ['Confirm', 'Change service'] }, session: { ...session, step: 'confirm', duration, total } }
      }
      return { turn: { text: "How many hours? e.g. 2 hours" }, session }
    }

    case 'confirm': {
      if (isYes(text) || isNo(text)) {
        if (isNo(text)) {
          return { turn: { text: 'No worries! What service do you need?' }, session: { ...session, step: 'service' } }
        }
        const id = `snb-${Date.now().toString(36)}`
        const expert = randomExpert(session.area!)
        const otp = generateOTP()
        const mapLink = getGoogleMapsLink(session.area!)
        const svc = getService(session.service!)!
        const duration = session.duration ?? 1
        const paymentUrl = `https://rzp.io/l/${id}`
        const confirmText = [
          `✅ *Booking Confirmed!*`,
          ``,
          `🧹 *Service:* ${svc.name}`,
          `📍 *Area:* ${resolveArea(session.area!) ?? session.area}`,
          `⏱️ *Duration:* ${duration} hour${duration > 1 ? 's' : ''}`,
          `💰 *Total:* ₹${session.total}`,
          ``,
          `👩‍💼 *Your Expert:*`,
          `*${expert?.name ?? 'Assigned soon'}* | ${expert?.photo ?? ''} | ⭐ ${expert?.rating ?? '4.8'} | ${expert?.bookings ?? '300+'} bookings`,
          ``,
          `🔐 *Your OTP:* *${otp}*`,
          `(Share this OTP when the expert arrives to verify identity)`,
          ``,
          `📍 *Expert Location:*`,
          `${mapLink}`,
          ``,
          `🔗 *Pay here:* ${paymentUrl}`,
          ``,
          `After payment, your expert will be dispatched. ETA: 12-25 min`,
        ].join('\n')
        return {
          turn: { text: confirmText, tracking: true },
          session: { ...session, step: 'tracking', paid: true, expert: expert ?? undefined, otp, bookingRef: id },
        }
      }
      return { turn: { text: 'Confirm or change?' }, session }
    }

    case 'tracking': {
      if (isYes(text)) {
        const expertName = session.expert?.name ?? 'Your expert'
        return {
          turn: {
            text: [
              `🚶 *${expertName}* is on the way!`,
              ``,
              `📍 Live location: ${getGoogleMapsLink(session.area!)}`,
              ``,
              `🔐 *OTP:* *${session.otp ?? 'N/A'}*`,
              `(Show this OTP to ${expertName} when they arrive)`,
              ``,
              `ETA: 12-25 min. Updates incoming...`,
            ].join('\n'),
          },
          session: { ...session, step: 'done' },
        }
      }
      return { turn: { text: 'Waiting for payment. Need anything else?' }, session }
    }

    case 'done': {
      if (isYes(text)) {
        const expertName = session.expert?.name ?? 'Your expert'
        return {
          turn: {
            text: [
              `✅ *${expertName}* has arrived!`,
              ``,
              `🔐 *OTP Verification:*`,
              `Your OTP: *${session.otp ?? 'N/A'}*`,
              `Please share this OTP with ${expertName} to verify they're from Snabbit.`,
              ``,
              `Rate your experience (1-5 stars):`,
            ].join('\n'),
            buttons: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐⭐'],
          },
          session: { ...session, step: 'rating' },
        }
      }
      return { turn: { text: 'Thanks! Type "new booking" to start over.' }, session }
    }

    case 'rating': {
      const rating = parseRating(text)
      if (rating) {
        return { turn: { text: `Thanks for the ${rating}⭐ rating! Type "new booking" to book again.` }, session: { ...session, step: 'done', rating } }
      }
      return { turn: { text: 'Tap a star rating (1-5):' }, session }
    }

    default:
      return { turn: { text: 'Type "new booking" to start.' }, session: { step: 'greeting' } }
  }
}
