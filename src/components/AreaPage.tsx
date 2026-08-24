import { useParams, Link } from "react-router-dom"
import { getArea } from "../lib/areas"
import { getServices } from "../lib/catalog"
import { waLink } from "../lib/wa"
import WhatsAppIcon from "./WhatsAppIcon"

export default function AreaPage() {
  const { slug } = useParams<{ slug: string }>()
  const area = slug ? getArea(slug) : undefined

  if (!area) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Area not found</h1>
          <Link to="/" className="text-[#25D366] hover:underline font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const allServices = getServices()
  const areaServices = allServices.filter((s) =>
    area.availableServices.some((as) => s.id.includes(as) || as.includes(s.id))
  )

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-[#075E54] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <WhatsAppIcon className="w-7 h-7" />
          <span className="text-xl font-bold">Snabbit</span>
        </div>
        <Link to="/" className="text-green-200 hover:text-white text-sm">
          ← All Areas
        </Link>
      </nav>

      <section className="bg-gradient-to-br from-[#075E54] to-[#128C7E] text-white px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">{area.name}</h1>
          <p className="text-green-100">{area.experts.length} verified experts available</p>
        </div>
      </section>

      <section className="px-6 py-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Our Experts in {area.name}</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {area.experts.map((expert, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="text-3xl mb-2">{expert.photo}</div>
              <h3 className="font-semibold text-gray-900">{expert.name}</h3>
              <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                <span>⭐ {expert.rating}</span>
                <span>{expert.bookings} bookings</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Available Services</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {areaServices.map((svc) => (
              <div key={svc.id} className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-4">
                <span className="text-3xl">{svc.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{svc.name}</h3>
                  <p className="text-sm text-gray-500">₹{svc.pricePerHour}/hour</p>
                </div>
                <a
                  href={waLink(`Hi! I need ${svc.name} in ${area.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
                >
                  Book
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 text-center">
        <a
          href={waLink(`Hi! I need a service in ${area.name}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-lg"
        >
          <WhatsAppIcon className="w-5 h-5" /> Book on WhatsApp — {area.name}
        </a>
      </section>

      <footer className="bg-[#075E54] text-white/60 text-center py-4 text-sm">
        <Link to="/" className="hover:text-white transition-colors">
          ← Back to Home
        </Link>
      </footer>
    </div>
  )
}
