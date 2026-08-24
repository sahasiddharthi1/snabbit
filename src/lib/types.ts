export interface Expert {
  name: string
  rating: number
  bookings: number
  photo: string
}

export interface Service {
  id: string
  name: string
  pricePerHour: number
  icon: string
}

export interface Area {
  slug: string
  name: string
  experts: Expert[]
  availableServices: string[]
}

export interface Session {
  step: string
  area?: string
  service?: string
  duration?: number
  expert?: Expert
  total?: number
  paid?: boolean
  rating?: number
  otp?: string
  bookingRef?: string
}

export interface BotTurn {
  text: string
  buttons?: string[]
  tracking?: boolean
}

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
