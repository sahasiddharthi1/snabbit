import type { Service } from './types'

const services: Service[] = [
  { id: 'dishwashing', name: 'Dishwashing', pricePerHour: 150, icon: '🍽️' },
  { id: 'kitchen', name: 'Kitchen Deep Clean', pricePerHour: 180, icon: '🧹' },
  { id: 'fullhouse', name: 'Full House Cleaning', pricePerHour: 250, icon: '🏠' },
  { id: 'laundry', name: 'Laundry & Ironing', pricePerHour: 160, icon: '👕' },
  { id: 'bathroom', name: 'Bathroom Deep Clean', pricePerHour: 200, icon: '🚿' },
  { id: 'sofa', name: 'Sofa & Carpet Cleaning', pricePerHour: 220, icon: '🛋️' },
  { id: 'ac', name: 'AC Servicing', pricePerHour: 300, icon: '❄️' },
  { id: 'pest', name: 'Pest Control', pricePerHour: 350, icon: '🐛' },
  { id: 'painting', name: 'House Painting', pricePerHour: 400, icon: '🎨' },
  { id: 'plumbing', name: 'Plumbing', pricePerHour: 280, icon: '🔧' },
  { id: 'electrical', name: 'Electrical Work', pricePerHour: 280, icon: '💡' },
  { id: 'deepclean', name: 'Deep Cleaning', pricePerHour: 270, icon: '✨' },
]

export function getService(id: string): Service | undefined {
  return services.find((s) => s.id === id)
}

export function getServices(): Service[] {
  return services
}
