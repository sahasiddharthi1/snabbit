import 'dotenv/config'
import { createServer } from 'node:http'
import { serverConfig } from './config'
import { handleIncoming } from './handler'
import { initRAG } from './rag'
import { initGemini } from './gemini'

function readBody(req: import('node:http').IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    const chunks: Buffer[] = []
    req.on('data', (c: Buffer) => chunks.push(c))
    req.on('end', () => resolve(Buffer.concat(chunks).toString()))
  })
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host}`)

  if (req.method === 'GET') {
    const mode = url.searchParams.get('hub.mode')
    const token = url.searchParams.get('hub.verify_token')
    const challenge = url.searchParams.get('hub.challenge')
    if (mode === 'subscribe' && token === serverConfig.verifyToken) {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end(challenge)
      return
    }
    res.writeHead(403)
    res.end('Forbidden')
    return
  }

  if (req.method === 'POST') {
    try {
      const raw = await readBody(req)
      const body = JSON.parse(raw)
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
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ status: 'ok' }))
    } catch (err) {
      console.error('[webhook] error:', err)
      res.writeHead(200)
      res.end(JSON.stringify({ status: 'error' }))
    }
    return
  }

  res.writeHead(405)
  res.end('Method not allowed')
})

server.listen(serverConfig.port, () => {
  initRAG()
  initGemini()
  console.log(`[webhook] listening on http://localhost:${serverConfig.port}`)
  if (serverConfig.localMock) console.log('[webhook] LOCAL MOCK MODE')
})
