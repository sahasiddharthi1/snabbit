import type { BotTurn } from '../src/lib/types'
import type { OutboundMessage } from './whatsapp'

export function presentTurn(turn: BotTurn): OutboundMessage[] {
  const msgs: OutboundMessage[] = []

  if (turn.buttons && turn.buttons.length > 0) {
    if (turn.buttons.length <= 3) {
      msgs.push({
        type: 'interactive',
        interactive: {
          body: { text: turn.text },
          action: {
            buttons: turn.buttons.map((b: string) => ({ reply: { title: b } })),
          },
        },
      })
    } else {
      msgs.push({
        type: 'interactive',
        interactive: {
          body: { text: turn.text },
          action: {
            buttons: turn.buttons.slice(0, 3).map((b: string) => ({ reply: { title: b } })),
          },
        },
      })
    }
  } else {
    msgs.push({ type: 'text', text: { body: turn.text } })
  }

  return msgs
}
