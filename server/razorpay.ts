import Razorpay from 'razorpay'

const KEY_ID = process.env.RAZORPAY_KEY_ID ?? ''
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET ?? ''

let razorpay: Razorpay | null = null

export function initRazorpay(): boolean {
  if (!KEY_ID || !KEY_SECRET) {
    console.log('[razorpay] No RAZORPAY_KEY_ID/RAZORPAY_KEY_SECRET — using mock links')
    return false
  }
  razorpay = new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET })
  console.log('[razorpay] Initialized with key:', KEY_ID.substring(0, 12) + '...')
  return true
}

export function isRazorpayReady(): boolean {
  return razorpay !== null
}

export interface PaymentLinkResult {
  shortUrl: string
  id: string
}

export async function createPaymentLink(params: {
  amount: number
  description: string
  customerName: string
  customerContact: string
  referenceId: string
}): Promise<PaymentLinkResult | null> {
  if (!razorpay) {
    console.log('[razorpay] Not initialized, skipping')
    return null
  }

  const rawContact = params.customerContact.replace(/[^0-9]/g, '')
  const contact = rawContact.startsWith('91') && rawContact.length >= 12
    ? `+${rawContact}`
    : rawContact.length === 10
      ? `+91${rawContact}`
      : `+${rawContact}`

  console.log(`[razorpay] Creating link: amount=${params.amount}, ref=${params.referenceId}, contact=${contact}`)

  try {
    const response = await razorpay.paymentLink.create({
      amount: params.amount * 100,
      currency: 'INR',
      description: params.description,
      reference_id: params.referenceId,
      customer: {
        name: params.customerName,
        contact,
      },
      notify: {
        sms: false,
        email: false,
      },
      reminder_enable: false,
      notes: {
        service: params.description,
        booking_id: params.referenceId,
      },
    })

    const shortUrl = (response as unknown as { short_url: string }).short_url
    const id = (response as unknown as { id: string }).id
    console.log(`[razorpay] ✅ Payment link created: ${shortUrl} (id: ${id})`)
    return { shortUrl, id }
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err)
    console.error(`[razorpay] ❌ Payment link creation failed: ${errMsg}`)
    if (err && typeof err === 'object' && 'error' in err) {
      console.error('[razorpay] Error details:', JSON.stringify((err as { error: unknown }).error))
    }
    return null
  }
}

export function getMockPaymentUrl(referenceId: string): string {
  return `https://rzp.io/l/${referenceId}`
}
