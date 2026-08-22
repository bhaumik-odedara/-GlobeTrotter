'use client'

import { useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Globe2,
  Home,
  Languages,
  LogIn,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Play,
  Search,
  Sparkles,
  Trophy,
  UserPlus,
  X,
} from 'lucide-react'

const languages = [
  { name: 'Spanish', native: 'Español', progress: 68, color: 'bg-primary', flag: 'ES' },
  { name: 'French', native: 'Français', progress: 42, color: 'bg-accent', flag: 'FR' },
  { name: 'Japanese', native: '日本語', progress: 24, color: 'bg-chart-2', flag: 'JP' },
]

const trending = [
  { name: 'Italian', native: 'Italiano', learners: '12.8k', flag: 'IT' },
  { name: 'Korean', native: '한국어', learners: '9.4k', flag: 'KR' },
  { name: 'Portuguese', native: 'Português', learners: '8.7k', flag: 'PT' },
]

function Logo() {
  return (
    <div className="flex items-center gap-2.5" aria-label="GlobeTrotter home">
      <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Globe2 className="size-5" aria-hidden="true" />
      </div>
      <span className="font-serif text-xl font-semibold tracking-tight text-foreground">GlobeTrotter</span>
    </div>
  )
}

function AuthPanel({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [submitted, setSubmitted] = useState(false)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <div className="relative w-full max-w-md rounded-3xl bg-card p-7 shadow-2xl ring-1 ring-border">
        <button onClick={onClose} className="absolute right-5 top-5 rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground" aria-label="Close authentication dialog"><X className="size-4" /></button>
        <div className="mb-7 flex flex-col gap-2">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Globe2 className="size-6" /></div>
          <h2 id="auth-title" className="font-serif text-3xl font-semibold tracking-tight">{mode === 'login' ? 'Welcome back' : 'Start your journey'}</h2>
          <p className="text-sm leading-6 text-muted-foreground">{mode === 'login' ? 'Continue your language adventure.' : 'Create an account and learn a language you love.'}</p>
        </div>
        {submitted ? <div className="flex flex-col items-center gap-3 py-8 text-center"><div className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="size-7" /></div><h3 className="font-serif text-2xl font-semibold">You&apos;re all set</h3><p className="text-sm text-muted-foreground">This demo is ready for your real auth provider.</p><button onClick={onClose} className="mt-3 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Explore dashboard</button></div> : <>
          {mode === 'register' && <label className="mb-4 flex flex-col gap-2 text-sm font-medium">Full name<input className="rounded-xl border border-input bg-background px-4 py-3 outline-none ring-primary/30 transition focus:ring-4" placeholder="Alex Morgan" /></label>}
          <label className="mb-4 flex flex-col gap-2 text-sm font-medium">Email address<input type="email" className="rounded-xl border border-input bg-background px-4 py-3 outline-none ring-primary/30 transition focus:ring-4" placeholder="you@example.com" /></label>
          <label className="mb-5 flex flex-col gap-2 text-sm font-medium">Password<input type="password" className="rounded-xl border border-input bg-background px-4 py-3 outline-none ring-primary/30 transition focus:ring-4" placeholder="••••••••" /></label>
          <button onClick={() => setSubmitted(true)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90">{mode === 'login' ? 'Log in' : 'Create account'}<ArrowRight className="size-4" /></button>
          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or continue with<span className="h-px flex-1 bg-border" /></div>
          <div className="grid grid-cols-3 gap-2"><button onClick={() => setSubmitted(true)} className="rounded-xl border border-border px-3 py-2.5 text-sm font-semibold transition hover:bg-muted">Google</button><button onClick={() => setSubmitted(true)} className="rounded-xl border border-border px-3 py-2.5 text-sm font-semibold transition hover:bg-muted">Apple</button><button onClick={() => setSubmitted(true)} className="rounded-xl border border-border px-3 py-2.5 text-sm font-semibold transition hover:bg-muted">Facebook</button></div>
          <p className="mt-6 text-center text-sm text-muted-foreground">{mode === 'login' ? 'New to GlobeTrotter?' : 'Already have an account?'} <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="font-semibold text-primary hover:underline">{mode === 'login' ? 'Register' : 'Log in'}</button></p>
        </>}
      </div>
    </div>
  )
}

export default function Page() {
  const [auth, setAuth] = useState(false)
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState('Home')
  return <main className="min-h-screen bg-background text-foreground">
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/95 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8"><Logo /><nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex" aria-label="Main navigation">{['Home', 'My learning', 'Explore'].map(item => <button key={item} onClick={() => setActive(item)} className={active === item ? 'text-primary' : 'transition hover:text-foreground'}>{item}</button>)}</nav><div className="flex items-center gap-2"><button className="hidden rounded-xl p-2.5 text-muted-foreground transition hover:bg-muted hover:text-foreground sm:block" aria-label="Search"><Search className="size-5" /></button><button onClick={() => setAuth(true)} className="hidden items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition hover:bg-muted sm:flex"><LogIn className="size-4" />Log in</button><button onClick={() => setAuth(true)} className="hidden items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:flex"><UserPlus className="size-4" />Register</button><button onClick={() => setMenu(!menu)} className="rounded-xl p-2.5 hover:bg-muted md:hidden" aria-label="Toggle menu"><Menu className="size-5" /></button></div></div>{menu && <div className="flex flex-col gap-4 border-t border-border px-5 py-4 text-sm md:hidden"><button onClick={() => setMenu(false)} className="text-left font-medium">Home</button><button onClick={() => setMenu(false)} className="text-left font-medium">My learning</button><button onClick={() => { setMenu(false); setAuth(true) }} className="text-left font-medium text-primary">Log in or register</button></div>}</header>
    <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-12"><section className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Tuesday, 22 August</p><h1 className="font-serif text-4xl font-semibold tracking-tight text-balance md:text-5xl">Good morning, Alex.</h1><p className="mt-3 max-w-lg text-base leading-7 text-muted-foreground">A few minutes today can take you somewhere new. Keep your momentum going.</p></div><button onClick={() => setAuth(true)} className="flex w-fit items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"><Sparkles className="size-4" />Keep learning</button></section>
      <section className="mt-10 grid gap-5 lg:grid-cols-[1.55fr_1fr]" aria-label="Learning overview"><div className="relative overflow-hidden rounded-3xl bg-primary p-7 text-primary-foreground shadow-sm md:p-9"><div className="relative z-10 max-w-md"><div className="mb-8 flex items-center justify-between"><span className="rounded-full bg-primary-foreground/15 px-3 py-1.5 text-xs font-semibold">CURRENT LANGUAGE</span><button className="rounded-full p-2 hover:bg-primary-foreground/10" aria-label="More options"><MoreHorizontal className="size-5" /></button></div><p className="font-serif text-4xl font-semibold">Spanish</p><p className="mt-1 text-primary-foreground/70">Español · A2 Elementary</p><div className="mt-9 flex items-end justify-between"><div><p className="text-5xl font-semibold tracking-tight">68<span className="text-2xl">%</span></p><p className="mt-1 text-sm text-primary-foreground/70">course progress</p></div><button onClick={() => setAuth(true)} className="flex items-center gap-2 rounded-xl bg-card px-4 py-3 text-sm font-semibold text-foreground transition hover:opacity-90"><Play className="size-4 fill-current" />Resume lesson</button></div><div className="mt-7 h-2 overflow-hidden rounded-full bg-primary-foreground/20"><div className="h-full w-[68%] rounded-full bg-primary-foreground" /></div></div><div className="absolute -bottom-20 -right-16 size-64 rounded-full border border-primary-foreground/10" /><div className="absolute -right-24 -top-28 size-72 rounded-full border border-primary-foreground/10" /></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1"><div className="rounded-3xl border border-border bg-card p-6"><div className="flex items-start justify-between"><div className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground"><Trophy className="size-5" /></div><span className="text-sm font-semibold text-primary">+12%</span></div><p className="mt-6 text-3xl font-semibold">7 day streak</p><p className="mt-1 text-sm leading-6 text-muted-foreground">You&apos;re building a great habit.</p></div><div className="rounded-3xl border border-border bg-card p-6"><div className="flex items-center justify-between"><p className="text-sm font-semibold">Weekly goal</p><span className="text-sm text-muted-foreground">4 / 5 days</span></div><div className="mt-5 flex gap-2">{[true, true, true, true, false].map((done, i) => <div key={i} className={`flex size-9 items-center justify-center rounded-full text-xs font-semibold ${done ? 'bg-primary text-primary-foreground' : 'border border-dashed border-border text-muted-foreground'}`}>{done ? <Check className="size-4" /> : i + 1}</div>)}</div><p className="mt-4 text-sm text-muted-foreground">One more session to hit your goal.</p></div></div></section>
      <section className="mt-12"><div className="mb-5 flex items-end justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Your languages</p><h2 className="mt-1 font-serif text-2xl font-semibold">Keep exploring</h2></div><button className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">View all <ArrowRight className="size-4" /></button></div><div className="grid gap-4 md:grid-cols-3">{languages.map(language => <button onClick={() => setAuth(true)} key={language.name} className="group rounded-2xl border border-border bg-card p-5 text-left transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"><div className="flex items-center justify-between"><span className="flex size-10 items-center justify-center rounded-xl bg-muted text-xs font-bold">{language.flag}</span><ChevronDown className="size-4 rotate-[-90deg] text-muted-foreground transition group-hover:translate-x-1" /></div><p className="mt-5 font-semibold">{language.name}</p><p className="text-sm text-muted-foreground">{language.native}</p><div className="mt-5 flex items-center gap-3"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full ${language.color}`} style={{ width: `${language.progress}%` }} /></div><span className="text-xs font-semibold text-muted-foreground">{language.progress}%</span></div></button>)}</div></section>
      <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Trending now</p><h2 className="mt-1 font-serif text-2xl font-semibold">Languages worth discovering</h2><p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">Join thousands of learners picking up a new way to see the world.</p><div className="mt-6 flex flex-col gap-3">{trending.map(language => <button onClick={() => setAuth(true)} key={language.name} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left transition hover:border-primary/40"><span className="flex size-10 items-center justify-center rounded-xl bg-muted text-xs font-bold">{language.flag}</span><span className="flex-1"><span className="block text-sm font-semibold">{language.name}</span><span className="text-xs text-muted-foreground">{language.native} · {language.learners} learners</span></span><ArrowRight className="size-4 text-muted-foreground" /></button>)}</div></div><div className="flex min-h-64 flex-col justify-between rounded-3xl bg-muted p-7 md:p-9"><div className="flex items-start justify-between"><div className="flex size-11 items-center justify-center rounded-2xl bg-card text-primary"><MessageCircle className="size-5" /></div><span className="rounded-full bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground">DAILY PRACTICE</span></div><div><h3 className="max-w-sm font-serif text-3xl font-semibold leading-tight">Small steps. Big conversations.</h3><p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">Learn the phrases you&apos;ll actually use when your next adventure begins.</p><button onClick={() => setAuth(true)} className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Start a practice session <ArrowRight className="size-4" /></button></div></div></section>
    </div>{auth && <AuthPanel onClose={() => setAuth(false)} />}
  </main>
}
