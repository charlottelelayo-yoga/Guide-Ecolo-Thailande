import { sql } from '../../lib/db'

function isAdmin(req) {
  return req.headers['x-admin-password'] === process.env.ADMIN_PASSWORD
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const b = req.body
    await sql`insert into suggestions (type,name,cat,addr,city,descr,cost,link,firstname,email)
      values (${b.type||'lieu'},${b.name},${b.cat},${b.addr},${b.city},${b.desc},${b.cost},${b.link},${b.firstname},${b.email})`
    return res.status(200).json({ success: true })
  }
  if (req.method === 'GET') {
    if (!isAdmin(req)) return res.status(401).json({ error: 'Non autorisé' })
    const rows = await sql`select * from suggestions order by created_at desc`
    return res.status(200).json(rows)
  }
  if (req.method === 'PATCH') {
    if (!isAdmin(req)) return res.status(401).json({ error: 'Non autorisé' })
    const { id, status } = req.body
    await sql`update suggestions set status=${status} where id=${id}`
    return res.status(200).json({ success: true })
  }
  res.status(405).end()
}
