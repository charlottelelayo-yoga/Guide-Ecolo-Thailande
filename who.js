import { sql } from '../../lib/db'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const rows = await sql`select * from who_content`
    return res.status(200).json(rows)
  }
  if (req.method === 'PATCH') {
    if (req.headers['x-admin-password'] !== process.env.ADMIN_PASSWORD)
      return res.status(401).json({ error: 'Non autorisé' })
    const { id, content } = req.body
    await sql`insert into who_content (id,content,updated_at) values (${id},${content},now())
              on conflict (id) do update set content=${content},updated_at=now()`
    return res.status(200).json({ success: true })
  }
  res.status(405).end()
}
