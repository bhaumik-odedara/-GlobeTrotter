'use server'

import bcrypt from 'bcryptjs'
import mysql from 'mysql2/promise'
import { cookies } from 'next/headers'
import { z } from 'zod'

const credentials = z.object({ email: z.string().email(), password: z.string().min(6), name: z.string().min(2).max(80).optional() })
let demoUsers = [{ id: 'demo-1', name: 'Demo Traveler', email: 'demo@globetrotter.app', passwordHash: bcrypt.hashSync('demo123', 10) }]

function hasDatabase() { return Boolean(process.env.DATABASE_URL || (process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME)) }
function pool() { return mysql.createPool(process.env.DATABASE_URL || { host: process.env.DB_HOST, port: Number(process.env.DB_PORT || 3306), user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME, connectionLimit: 5 }) }

export async function registerUser(input: unknown) {
  const parsed = credentials.extend({ name: z.string().min(2).max(80) }).safeParse(input)
  if (!parsed.success) return { ok: false, message: 'Enter a valid name, email, and password.' }
  const { email, password, name } = parsed.data
  const passwordHash = await bcrypt.hash(password, 12)
  try {
    if (hasDatabase()) {
      const db = pool()
      const [existing] = await db.execute('SELECT id FROM users WHERE email = ? LIMIT 1', [email])
      if ((existing as unknown[]).length) return { ok: false, message: 'Unable to create account with these details.' }
      await db.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, passwordHash])
      await db.end()
    } else {
      if (demoUsers.some((user) => user.email === email)) return { ok: false, message: 'Unable to create account with these details.' }
      demoUsers.push({ id: `demo-${Date.now()}`, name, email, passwordHash })
    }
    const jar = await cookies(); jar.set('globetrotter_demo_session', JSON.stringify({ name, email }), { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 * 30, path: '/' })
    return { ok: true, name, source: hasDatabase() ? 'mysql' : 'demo' }
  } catch { return { ok: false, message: 'Database connection is unavailable. Demo mode is still ready to use.' } }
}

export async function loginUser(input: unknown) {
  const parsed = credentials.omit({ name: true }).safeParse(input)
  if (!parsed.success) return { ok: false, message: 'Enter a valid email and password.' }
  const { email, password } = parsed.data
  try {
    let user: { name: string; email: string; passwordHash: string } | undefined
    if (hasDatabase()) {
      const db = pool(); const [rows] = await db.execute('SELECT name, email, password FROM users WHERE email = ? LIMIT 1', [email]); await db.end()
      const row = (rows as Array<{ name: string; email: string; password: string }>)[0]
      if (row) user = { name: row.name, email: row.email, passwordHash: row.password }
    } else user = demoUsers.find((candidate) => candidate.email === email)
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) return { ok: false, message: 'Unable to sign in with these details.' }
    const jar = await cookies(); jar.set('globetrotter_demo_session', JSON.stringify({ name: user.name, email: user.email }), { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 * 30, path: '/' })
    return { ok: true, name: user.name, source: hasDatabase() ? 'mysql' : 'demo' }
  } catch { return { ok: false, message: 'Database connection is unavailable. Try demo@globetrotter.app / demo123.' } }
}

export async function logoutUser() { const jar = await cookies(); jar.delete('globetrotter_demo_session'); return { ok: true } }

export async function saveLanguage(language: string) { const jar = await cookies(); jar.set('globetrotter_language', language, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 * 365, path: '/' }); return { ok: true } }
