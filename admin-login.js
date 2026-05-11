export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  if (req.body.password === process.env.ADMIN_PASSWORD)
    return res.status(200).json({ success: true })
  return res.status(401).json({ error: 'Mot de passe incorrect' })
}
