import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleIncoming } from '../server/handler'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'] as string
    const token = req.query['hub.verify_token'] as string
    const challenge = req.query['hub.challenge'] as string
    if (mode === 'subscribe' && token === process.env.WEBHOOK_VERIFY_TOKEN) {
      res.status(200).send(challenge)
      return
    }
    res.status(403).send('Forbidden')
    return
  }

  if (req.method === 'POST') {
    try {
      const body = req.body
      const entries = body.entry ?? []
      for (const entry of entries) {
        const changes = entry.changes ?? []
        for (const change of changes) {
          const value = change.value ?? {}
          const messages = value.messages ?? []
          for (const msg of messages) {
            const phone = msg.from
            if (phone) await handleIncoming(phone, msg)
          }
        }
      }
      res.status(200).json({ status: 'ok' })
    } catch (err) {
      console.error('[webhook] error:', err)
      res.status(200).json({ status: 'error' })
    }
    return
  }

  res.status(405).send('Method not allowed')
}
