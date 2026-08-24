import 'dotenv/config'

export const serverConfig = {
  port: Number(process.env.WEBHOOK_PORT ?? 8788),
  verifyToken: process.env.WEBHOOK_VERIFY_TOKEN ?? 'snabbit-webhook-demo',
  localMock: process.env.WHATSAPP_LOCAL_MOCK === '1',
  graphApiVersion: process.env.GRAPH_API_VERSION ?? 'v21.0',
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID ?? '',
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN ?? '',
  razorpayBase: process.env.RAZORPAY_PAYMENT_LINK_BASE ?? 'https://rzp.io/l',
}
