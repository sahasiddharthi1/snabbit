import { Link } from "react-router-dom"
import { getAreas } from "../lib/areas"
import { getServices } from "../lib/catalog"
import { waLink } from "../lib/wa"
import WhatsAppIcon from "./WhatsAppIcon"

const steps = [
  { icon: "💬", title: "Pick a service", desc: "Tell us what you need — cleaning, plumbing, electrical, and more." },
  { icon: "✅", title: "Confirm details", desc: "Choose your area, time, and expert. We show real-time availability." },
  { icon: "💳", title: "Pay & track", desc: "Pay securely via Razorpay. Track your expert live on WhatsApp." },
]

const faqs = [
  { q: "Do I need to download an app?", a: "No! Snabbit works entirely on WhatsApp. Just send a message to get started." },
  { q: "How do I pay?", a: "After confirming your booking, you'll receive a secure Razorpay payment link on WhatsApp." },
  { q: "Can I track my expert?", a: "Yes! Once your expert is dispatched, you can track their live location directly in the chat." },
  { q: "What if I need to cancel?", a: "You can cancel anytime before the expert arrives. Just message 'cancel' on WhatsApp." },
  { q: "Is there a subscription?", a: "No subscriptions needed. Pay per service only. Book as many times as you like." },
]

export default function Landing() {
  const areas = getAreas()
  const services = getServices()

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-[#075E54] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <WhatsAppIcon className="w-7 h-7" />
          <span className="text-xl font-bold">Snabbit</span>
        </div>
        <Link to="/chat" className="bg-[#25D366] hover:bg-[#20ba5a] px-5 py-2 rounded-full font-semibold text-sm transition-colors">
          Try Demo
        </Link>
      </nav>

      <section className="bg-gradient-to-br from-[#075E54] to-[#128C7E] text-white px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold max-w-2xl mx-auto mb-4">
          Book home services via WhatsApp
        </h1>
        <p className="text-lg text-green-100 max-w-xl mx-auto mb-8">
          No app download. No registration. Just message and get your home serviced.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/chat" className="bg-[#25D366] hover:bg-[#20ba5a] px-8 py-3 rounded-full font-semibold text-lg transition-colors inline-flex items-center gap-2">
            <WhatsAppIcon className="w-5 h-5" /> Try the Demo
          </Link>
          <a href={waLink("Hi! I'd like to book a service.")} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 border border-white/30 px-8 py-3 rounded-full font-semibold text-lg transition-colors">
            Book on WhatsApp
          </a>
        </div>
      </section>

      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Services & Pricing</h2>
          <p className="text-gray-500 text-center mb-10">Transparent hourly rates for all services</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm overflow-hidden">
              <thead>
                <tr className="bg-[#075E54] text-white">
                  <th className="px-4 py-3 text-left text-sm font-semibold">Service</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Price/Hour</th>
                </tr>
              </thead>
              <tbody>
                {services.map((svc, i) => (
                  <tr key={svc.id} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-4 py-3 text-sm">
                      {svc.icon} {svc.name}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">₹{svc.pricePerHour}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Available in 39 Bangalore areas</h2>
        <p className="text-gray-500 text-center mb-8">Find experts near you</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {areas.map((area) => (
            <Link
              key={area.slug}
              to={`/area/${area.slug}`}
              className="bg-white border border-gray-200 hover:border-[#25D366] hover:bg-green-50 rounded-lg px-3 py-2 text-sm text-center transition-colors"
            >
              {area.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-lg p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-500 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#075E54] text-white px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-green-100 mb-8">Book your first service in under 60 seconds</p>
        <Link to="/chat" className="bg-[#25D366] hover:bg-[#20ba5a] px-8 py-3 rounded-full font-semibold text-lg transition-colors inline-flex items-center gap-2">
          <WhatsAppIcon className="w-5 h-5" /> Try the Demo
        </Link>
      </section>

      <footer className="bg-[#064E3B] text-white/60 text-center py-4 text-sm">
        &copy; {new Date().getFullYear()} Snabbit. All rights reserved.
      </footer>
    </div>
  )
}
