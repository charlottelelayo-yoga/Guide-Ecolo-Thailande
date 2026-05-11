import { sql } from '../../lib/db'

function isAdmin(req) {
  return req.headers['x-admin-password'] === process.env.ADMIN_PASSWORD
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const rows = await sql`select * from events where published=true order by day_str`
    return res.status(200).json(rows.map(e => ({
      id: e.id, title: e.title, date: e.date_str, day: e.day_str,
      month: e.month_str, lieu: e.lieu, type: e.type_str,
      desc: e.descr, full_desc: e.full_descr, published: e.published
    })))
  }
  if (!isAdmin(req)) return res.status(401).json({ error: 'Non autorisé' })
  if (req.method === 'POST') {
    const b = req.body
    const rows = await sql`
      insert into events (title,date_str,day_str,month_str,lieu,type_str,descr,full_descr,published)
      values (${b.title},${b.date},${b.day},${b.month},${b.lieu},${b.type},${b.desc},${b.full_desc},${b.published!==false})
      returning *`
    return res.status(200).json(rows[0])
  }
  if (req.method === 'PATCH') {
    const b = req.body
    await sql`
      update events set title=${b.title},date_str=${b.date},day_str=${b.day},
        month_str=${b.month},lieu=${b.lieu},type_str=${b.type},
        descr=${b.desc},full_descr=${b.full_desc},published=${b.published!==false}
      where id=${b.id}`
    return res.status(200).json({ success: true })
  }
  if (req.method === 'DELETE') {
    if (!isAdmin(req)) return res.status(401).end()
    await sql`delete from events where id=${req.body.id}`
    return res.status(200).json({ success: true })
  }
  res.status(405).end()
}
