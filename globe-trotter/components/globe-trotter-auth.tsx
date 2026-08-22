'use client'

import { useState } from 'react'
import { Apple, ArrowRight, Check, Globe2, LockKeyhole, Mail, MapPin, Sparkles } from 'lucide-react'

const languages = [
  { name: 'Spanish', native: 'Español', region: 'Europe & Americas', color: 'bg-[#e9a23b]' },
  { name: 'French', native: 'Français', region: 'Europe & Africa', color: 'bg-[#7d9edb]' },
  { name: 'Japanese', native: '日本語', region: 'East Asia', color: 'bg-[#e89191]' },
  { name: 'Italian', native: 'Italiano', region: 'Europe', color: 'bg-[#83b79a]' },
]

export function GlobeTrotterAuth() {
  const [mode, setMode] = useState<'register' | 'login'>('register')
  const [selected, setSelected] = useState('Spanish')
  const [submitted, setSubmitted] = useState(false)

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
        <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight" aria-label="GlobeTrotter home">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Globe2 size={20} /></span>
          GlobeTrotter
        </a>
        <p className="hidden text-sm text-muted-foreground sm:block">Your next chapter starts with hello.</p>
      </header>

      <div id="top" className="mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl items-center gap-12 px-6 pb-12 lg:grid-cols-[1fr_0.88fr] lg:gap-24 lg:px-12 lg:pb-20">
        <section className="relative py-8 lg:py-14">
          <div className="absolute -left-20 top-20 -z-0 size-72 rounded-full bg-[#e9a23b]/10 blur-3xl" aria-hidden="true" />
          <div className="relative z-10 max-w-xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm"><Sparkles size={14} className="text-[#e9a23b]" /> Learn a language. Find your way.</div>
            <h1 className="text-balance font-serif text-5xl leading-[1.03] tracking-[-0.04em] sm:text-6xl lg:text-7xl">Speak the world<br /><em className="font-normal text-primary">into existence.</em></h1>
            <p className="mt-7 max-w-md text-pretty text-base leading-7 text-muted-foreground sm:text-lg">Build a language habit that travels with you. Choose what sparks your curiosity and make every destination feel closer.</p>
            <div className="mt-12 flex items-center gap-5 border-t border-border pt-6">
              <div className="flex -space-x-2" aria-hidden="true"><span className="flex size-9 items-center justify-center rounded-full border-2 border-background bg-[#e9a23b] text-xs">AM</span><span className="flex size-9 items-center justify-center rounded-full border-2 border-background bg-[#7d9edb] text-xs">JL</span><span className="flex size-9 items-center justify-center rounded-full border-2 border-background bg-[#83b79a] text-xs">SK</span></div>
              <p className="text-sm text-muted-foreground"><strong className="text-foreground">12,000+ curious people</strong><br />are learning with GlobeTrotter</p>
            </div>
          </div>
        </section>

        <section className="w-full max-w-md justify-self-center lg:justify-self-end" aria-label="Authentication">
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_24px_80px_-35px_rgba(40,35,25,0.4)] sm:p-8">
            <div className="mb-7 flex rounded-xl bg-muted p-1" role="tablist" aria-label="Authentication mode">
              {(['register', 'login'] as const).map((item) => <button key={item} type="button" onClick={() => { setMode(item); setSubmitted(false) }} className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition ${mode === item ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'}`} role="tab" aria-selected={mode === item}>{item === 'register' ? 'Create account' : 'Log in'}</button>)}
            </div>
            <div className="mb-6"><p className="text-sm text-muted-foreground">{mode === 'register' ? 'Start your language journey' : 'Welcome back, traveler'}</p><h2 className="mt-1 text-2xl font-semibold tracking-tight">{mode === 'register' ? 'Join GlobeTrotter' : 'Continue learning'}</h2></div>
            <div className="grid grid-cols-3 gap-2">
              <SocialButton label="Google" icon={<span className="font-bold text-[#4285f4]">G</span>} />
              <SocialButton label="Apple" icon={<Apple size={17} fill="currentColor" />} />
              <SocialButton label="Facebook" icon={<span className="font-bold text-[#1877f2]">f</span>} />
            </div>
            <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or use email<span className="h-px flex-1 bg-border" /></div>
            {submitted ? <div className="rounded-2xl bg-[#83b79a]/15 p-6 text-center"><span className="mx-auto flex size-11 items-center justify-center rounded-full bg-[#83b79a] text-white"><Check size={22} /></span><h3 className="mt-4 font-semibold">You&apos;re all set for the demo</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Your GlobeTrotter profile is ready. Pick a language below to begin.</p></div> : <form onSubmit={submit} className="space-y-4"><label className="block text-sm font-medium">Email address<div className="relative mt-2"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={17} /><input required type="email" placeholder="you@example.com" className="h-12 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20" /></div></label>{mode === 'register' && <label className="block text-sm font-medium">Your name<div className="relative mt-2"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={17} /><input required placeholder="What should we call you?" className="h-12 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20" /></div></label>}<label className="block text-sm font-medium">Password<div className="relative mt-2"><LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={17} /><input required type="password" minLength={6} placeholder="At least 6 characters" className="h-12 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20" /></div></label><button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition hover:opacity-90">{mode === 'register' ? 'Create my account' : 'Log in to GlobeTrotter'}<ArrowRight size={17} /></button></form>}
            <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">By continuing, you agree to our Terms and acknowledge our Privacy Policy.</p>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">Demo mode — authentication is not connected to a database yet.</p>
        </section>
      </div>

      <section className="border-t border-border bg-muted/40 px-6 py-14 lg:px-12"><div className="mx-auto max-w-7xl"><div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-sm font-medium text-[#b77918]">Find your starting point</p><h2 className="mt-1 text-3xl font-semibold tracking-tight">Trending languages</h2></div><p className="max-w-xs text-sm leading-6 text-muted-foreground">A little curiosity can take you a long way.</p></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{languages.map((language) => <button key={language.name} type="button" onClick={() => setSelected(language.name)} className={`group flex items-center gap-4 rounded-2xl border bg-card p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md ${selected === language.name ? 'border-primary ring-2 ring-primary/15' : 'border-border'}`}><span className={`flex size-12 items-center justify-center rounded-xl text-lg ${language.color}`}>{language.native.slice(0, 2)}</span><span className="min-w-0"><strong className="block text-sm">{language.name}</strong><span className="text-xs text-muted-foreground">{language.region}</span></span>{selected === language.name && <Check size={16} className="ml-auto text-primary" />}</button>)}</div></div></section>
    </main>
  )
}

function SocialButton({ label, icon }: { label: string; icon: React.ReactNode }) { return <button type="button" onClick={() => undefined} className="flex h-11 items-center justify-center gap-2 rounded-xl border border-input bg-background text-xs font-medium transition hover:bg-muted" aria-label={`Continue with ${label}`}>{icon}</button> }
