export interface TrackingEvent {
  time: Date
  label: string
  icon: string
}

export function generateTrackingEvents(expertName: string): TrackingEvent[] {
  const now = new Date()
  return [
    { time: new Date(now.getTime() - 30 * 60000), label: 'Booking confirmed', icon: '✅' },
    { time: new Date(now.getTime() - 25 * 60000), label: `${expertName} assigned`, icon: '👩‍💼' },
    { time: new Date(now.getTime() - 20 * 60000), label: `${expertName} is on the way`, icon: '🚶' },
    { time: new Date(now.getTime() - 10 * 60000), label: `${expertName} is 5 min away`, icon: '📍' },
    { time: new Date(now.getTime() - 2 * 60000), label: `${expertName} has arrived`, icon: '🎉' },
  ]
}
