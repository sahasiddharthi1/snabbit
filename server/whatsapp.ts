export interface OutboundMessage {
  type: 'text' | 'interactive'
  text?: { body: string }
  interactive?: {
    body?: { text: string }
    action?: {
      buttons?: Array<{ reply?: { title: string } }>
    }
  }
}

export async function sendTextMessage(to: string, body: string): Promise<void> {
  const { serverConfig } = await import('./config')
  if (serverConfig.localMock) {
    console.log(`[wa] MOCK → ${to}: ${body.substring(0, 80)}...`)
    return
  }
  const url = `https://graph.facebook.com/${serverConfig.graphApiVersion}/${serverConfig.phoneNumberId}/messages`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${serverConfig.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body },
    }),
  })
  if (!res.ok) {
    const err = await res.text()
    console.error(`[wa] sendText failed: ${err}`)
  }
}
