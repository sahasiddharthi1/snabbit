import { waLink } from "../lib/wa"
import WhatsAppIcon from "./WhatsAppIcon"

export default function BookButton() {
  return (
    <a
      href={waLink("Hi! I'd like to book a service.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full p-4 shadow-lg transition-colors z-50"
      aria-label="Book on WhatsApp"
    >
      <WhatsAppIcon className="w-8 h-8" />
    </a>
  )
}
