import type { Session } from '../src/lib/types'

export function generateTrackingUpdate(session: Session): string {
  const expertName = session.expert?.name ?? 'Your expert'
  const lines = [
    `📍 *Live Tracking Update*`,
    ``,
    `👩‍💼 *Expert:* ${expertName}`,
    `🧹 *Service:* ${session.service}`,
    `📍 *Area:* ${session.area}`,
    `🔐 *OTP:* *${session.otp ?? 'N/A'}*`,
    ``,
    `Status: On the way`,
  ]
  return lines.join('\n')
}
