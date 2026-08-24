import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export interface HousehelpRecord {
  id: string
  city: string
  locality: string
  zone: string
  pincode: string
  serviceType: string
  workType: string
  hoursPerDay: number
  houseSizeBhk: number
  pricingMonthly: number
  availability: string
  preferredShift: string
  verifiedStatus: string
  hiringMode: string
  experienceYears: number
  weeklyDays: number
}

let records: HousehelpRecord[] = []
let index: Map<string, string[]> = new Map()
let idf: Map<string, number> = new Map()

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1)
}

function parseCSV(csvPath: string): HousehelpRecord[] {
  const raw = readFileSync(csvPath, 'utf-8')
  const lines = raw.split('\n').filter((l) => l.trim())
  const header = lines[0].split(',')
  const rows: HousehelpRecord[] = []

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',')
    if (cols.length < header.length) continue
    rows.push({
      id: cols[0]?.trim() ?? '',
      city: cols[1]?.trim() ?? '',
      locality: cols[2]?.trim() ?? '',
      zone: cols[3]?.trim() ?? '',
      pincode: cols[4]?.trim() ?? '',
      serviceType: cols[5]?.trim() ?? '',
      workType: cols[6]?.trim() ?? '',
      hoursPerDay: parseFloat(cols[7]?.trim() ?? '0') || 0,
      houseSizeBhk: parseInt(cols[8]?.trim() ?? '0') || 0,
      pricingMonthly: parseInt(cols[9]?.trim() ?? '0') || 0,
      availability: cols[10]?.trim() ?? '',
      preferredShift: cols[11]?.trim() ?? '',
      verifiedStatus: cols[12]?.trim() ?? '',
      hiringMode: cols[13]?.trim() ?? '',
      experienceYears: parseInt(cols[14]?.trim() ?? '0') || 0,
      weeklyDays: parseInt(cols[15]?.trim() ?? '0') || 0,
    })
  }
  return rows
}

function buildIndex(docs: HousehelpRecord[]): void {
  const N = docs.length
  const df = new Map<string, number>()

  docs.forEach((doc, idx) => {
    const text = [
      doc.locality,
      doc.serviceType,
      doc.workType,
      doc.availability,
      doc.verifiedStatus,
      doc.zone,
    ].join(' ')
    const tokens = [...new Set(tokenize(text))]
    index.set(String(idx), tokens)
    tokens.forEach((t) => df.set(t, (df.get(t) ?? 0) + 1))
  })

  idf = new Map()
  df.forEach((freq, term) => {
    idf.set(term, Math.log((N + 1) / (freq + 1)) + 1)
  })
}

function bm25Score(query: string, docIdx: string, avgDl: number, k1 = 1.5, b = 0.75): number {
  const tokens = tokenize(query)
  const docTokens = index.get(docIdx) ?? []
  const dl = docTokens.length
  const termFreq = new Map<string, number>()
  docTokens.forEach((t) => termFreq.set(t, (termFreq.get(t) ?? 0) + 1))

  let score = 0
  for (const term of tokens) {
    const tf = termFreq.get(term) ?? 0
    const idfVal = idf.get(term) ?? 1
    const norm = tf * (k1 + 1) / (tf + k1 * (1 - b + b * dl / avgDl))
    score += idfVal * norm
  }
  return score
}

export function initRAG(csvPath?: string): void {
  const path = csvPath ?? join(process.cwd(), 'data', 'bangalore_househelp_5000.csv')
  try {
    records = parseCSV(path)
    buildIndex(records)
    console.log(`[rag] Loaded ${records.length} records, indexed ${index.size} documents`)
  } catch (err) {
    console.log('[rag] CSV not found — RAG disabled')
    records = []
  }
}

export interface RAGResult {
  records: HousehelpRecord[]
  summary: string
}

export function search(query: string, topK = 5, localityFilter?: string): RAGResult {
  const scores: Array<{ idx: number; score: number }> = []
  const avgDl = 6

  for (let i = 0; i < records.length; i++) {
    const doc = records[i]
    if (localityFilter && !doc.locality.toLowerCase().includes(localityFilter.toLowerCase())) {
      continue
    }
    const docIdx = String(i)
    if (!index.has(docIdx)) continue
    const score = bm25Score(query, docIdx, avgDl)
    if (score > 0) scores.push({ idx: i, score })
  }

  scores.sort((a, b) => b.score - a.score)
  const top = scores.slice(0, topK).map((s) => records[s.idx])

  const summary = top
    .map(
      (r) =>
        `${r.serviceType} in ${r.locality} — ₹${r.pricingMonthly}/mo, ${r.hoursPerDay}hrs/day, ${r.experienceYears}yr exp, ${r.availability}, ${r.verifiedStatus}`,
    )
    .join('\n')

  return { records: top, summary }
}

export function getRecords(): HousehelpRecord[] {
  return records
}

export function getStats(): { total: number; localities: number; services: number } {
  const localities = new Set(records.map((r) => r.locality))
  const services = new Set(records.map((r) => r.serviceType))
  return { total: records.length, localities: localities.size, services: services.size }
}
