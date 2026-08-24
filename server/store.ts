import type { Session } from '../src/lib/types'

const sessions = new Map<string, Session>()

export const store = {
  get(phone: string): Session | undefined {
    return sessions.get(phone)
  },
  set(phone: string, session: Session): void {
    sessions.set(phone, session)
  },
  delete(phone: string): void {
    sessions.delete(phone)
  },
  clear(): void {
    sessions.clear()
  },
}
