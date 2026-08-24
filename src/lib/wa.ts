const NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? '919876543210'

export function waLink(text?: string): string {
  const base = `https://wa.me/${NUMBER}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}
