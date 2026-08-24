import { createSession, handleUserInput } from '../src/lib/engine'
import { resolveArea } from '../src/lib/areas'
import { presentTurn } from './presenter'
import { store } from './store'
import { sendTextMessage } from './whatsapp'

export async function handleIncoming(phone: string, msg: { type: string; text?: { body: string } }): Promise<void> {
  const text = msg.type === 'text' ? msg.text?.body : null
  if (!text) return

  const prev = store.get(phone)
  const session = prev ?? createSession(resolveArea(text))

  const { turn, session: next } = handleUserInput(session, text)
  store.set(phone, next)

  const messages = presentTurn(turn)
  for (const m of messages) {
    if (m.type === 'text' && m.text) {
      await sendTextMessage(phone, m.text.body)
    }
  }
}
