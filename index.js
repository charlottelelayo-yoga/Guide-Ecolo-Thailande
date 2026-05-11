import { neon } from '@neondatabase/serverless'
import fs from 'fs'
import path from 'path'

export default function Home() { return null }

export async function getServerSideProps({ res }) {
  const htmlPath = path.join(process.cwd(), 'public', 'guide.html')
  let html = fs.readFileSync(htmlPath, 'utf-8')

  try {
    const sql = neon(process.env.DATABASE_URL)
    const [events, who] = await Promise.all([
      sql`select * from events where published=true order by day_str`,
      sql`select * from who_content`,
    ])
    const eventsForJs = events.map(e => ({
      id: e.id, title: e.title, date: e.date_str, day: e.day_str,
      month: e.month_str, lieu: e.lieu, type: e.type_str,
      desc: e.descr, full_desc: e.full_descr, published: e.published
    }))
    html = html
      .replace('// DYNAMIC_EVENTS_PLACEHOLDER', `const DYNAMIC_EVENTS = ${JSON.stringify(eventsForJs)};`)
      .replace('// DYNAMIC_WHO_PLACEHOLDER', `const DYNAMIC_WHO = ${JSON.stringify(who)};`)
  } catch(e) {
    console.error('DB error:', e.message)
    html = html
      .replace('// DYNAMIC_EVENTS_PLACEHOLDER', 'const DYNAMIC_EVENTS = null;')
      .replace('// DYNAMIC_WHO_PLACEHOLDER', 'const DYNAMIC_WHO = null;')
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.write(html)
  res.end()
  return { props: {} }
}
