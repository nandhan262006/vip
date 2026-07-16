'use client'

import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import Image from 'next/image'
import jsPDF from 'jspdf'

interface StepItem {
  id: string
  name: string
  image: string
  price: number
  category?: string
}

interface Step {
  id: string
  title: string
  subtitle?: string
  type: 'welcome' | 'multi-quantity' | 'single-select' | 'final'
  items: StepItem[]
  condition?: (selections: Record<string, number>) => boolean
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}

function fmt(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

function getSummary(visibleSteps: Step[], quantities: Record<string, number>, selections: Record<string, number>) {
  const items: { name: string; qty: number; price: number }[] = []
  for (const step of visibleSteps) {
    if (step.type === 'final' || step.type === 'welcome') continue
    for (const item of step.items) {
      const qty = quantities[item.id] || selections[item.id] || 0
      if (qty > 0) {
        items.push({ name: item.name, qty, price: item.price * qty })
      }
    }
  }
  return items
}

function calcTotal(visibleSteps: Step[], quantities: Record<string, number>, selections: Record<string, number>) {
  let total = 0
  for (const step of visibleSteps) {
    for (const item of step.items) {
      const qty = quantities[item.id] || selections[item.id] || 0
      total += item.price * qty
    }
  }
  return total
}

function buildPdf(
  formData: { name: string; date: string; venue: string; phone: string; email: string },
  totalPrice: number,
  items: { name: string; qty: number; price: number }[],
  logoDataUrl?: string
) {
  const doc = new jsPDF({ format: 'a4', unit: 'mm' })
  const M = 20
  const W = 210 - M * 2
  const R: [number, number, number] = [220, 20, 60]
  const G: [number, number, number] = [100, 100, 100]
  const D: [number, number, number] = [30, 30, 30]
  let y = M

  if (logoDataUrl) {
    doc.addImage(logoDataUrl, 'PNG', M, y - 5, 35, 17.5)
  }
  const tx = logoDataUrl ? M + 42 : M
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(24)
  doc.setTextColor(...R)
  doc.text('VIP Studios', tx, y)
  y += 8
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(...G)
  doc.text('Wedding Photography & Cinematography', tx, y)
  y += 5
  doc.text('+91 92999 50999', tx, y)
  doc.setDrawColor(...R)
  doc.setLineWidth(0.8)
  doc.line(M, y, M + W, y)
  y += 10
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.setTextColor(...D)
  doc.text('Wedding Quotation', M, y)
  y += 12
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  for (const [l, v] of [['Name', formData.name], ['Date', formData.date || '—'], ['Venue', formData.venue || '—'], ['Phone', formData.phone], ['Email', formData.email]] as const) {
    doc.setFont('helvetica', 'bold')
    doc.text(l + ':', M, y)
    doc.setFont('helvetica', 'normal')
    doc.text(v, M + 40, y)
    y += 7
  }
  y += 6
  doc.setDrawColor(...R)
  doc.line(M, y, M + W, y)
  y += 8
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('Selected Services', M, y)
  y += 8
  doc.setFillColor(...R)
  doc.rect(M, y - 4, W, 7, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(9)
  doc.text('Service', M + 3, y)
  doc.text('Qty', M + 120, y)
  doc.text('Amount', M + 150, y)
  y += 10
  doc.setTextColor(...D)
  doc.setFont('helvetica', 'normal')
  for (const item of items) {
    if (y > 270) { doc.addPage(); y = M }
    doc.text(item.name, M + 3, y)
    doc.text(String(item.qty), M + 122, y)
    doc.text(fmt(item.price), M + 150, y)
    y += 7
  }
  y += 4
  doc.setDrawColor(200, 200, 200)
  doc.line(M, y, M + W, y)
  y += 7
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.setTextColor(...R)
  doc.text('Total: ' + fmt(totalPrice), M + 130, y)
  y += 18
  doc.setDrawColor(...R)
  doc.line(M, y, M + W, y)
  y += 8
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(...G)
  for (const line of [
    'If another photography team\'s hired, the contract will be canceled immediately.',
    'Sessions last for 5-6 hours. Travel and stay is arranged by the client.',
    'Full payment is due on the wedding day. Output timeline depends on timely payment.',
    'If the project is on hold for 6 months, we\'re not responsible for data loss.',
    'Original data can be received via client-provided drive. Re-copying available at Rs. 29,999/-.',
  ]) {
    doc.text(line, M, y)
    y += 4
  }
  doc.text('Generated on ' + new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }), M, 285)
  return doc
}

export default function QuoteBuilder() {
  const [stepIdx, setStepIdx] = useState(0)
  const [qtys, setQtys] = useState<Record<string, number>>({})
  const [sels, setSels] = useState<Record<string, number>>({})
  const [form, setForm] = useState({ name: '', date: '', venue: '', phone: '', email: '', accepted: false })
  const [done, setDone] = useState(false)
  const [lastStep, setLastStep] = useState(0)
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null)
  const [loadedSteps, setLoadedSteps] = useState<Step[] | null>(null)

  useEffect(() => {
    fetch('/logo.png')
      .then((r) => r.blob())
      .then((blob) => {
        const reader = new FileReader()
        reader.onloadend = () => setLogoDataUrl(reader.result as string)
        reader.readAsDataURL(blob)
      })
    fetch('/api/admin/quotes')
      .then((r) => r.json())
      .then((data: Step[]) => {
        const steps: Step[] = (data as unknown as Array<{ stepId: string; title: string; subtitle: string | null; type: string; items: string }>).map((q) => ({
          id: q.stepId,
          title: q.title,
          subtitle: q.subtitle || undefined,
          type: q.type as Step['type'],
          items: (() => { try { return JSON.parse(q.items) as StepItem[] } catch { return [] as StepItem[] } })(),
        }))
        setLoadedSteps(steps)
      })
      .catch(() => {
        // keep null, will show loading
      })
  }, [])

  const visibleSteps = useMemo(() => {
    const steps = loadedSteps || []
    return steps.filter((s) => !s.condition || s.condition(sels))
  }, [loadedSteps, sels])

  const step = visibleSteps[stepIdx]
  const total = useMemo(() => calcTotal(visibleSteps, qtys, sels), [visibleSteps, qtys, sels])
  const summary = useMemo(() => getSummary(visibleSteps, qtys, sels), [visibleSteps, qtys, sels])

  const canGo = useMemo(() => {
    if (!step) return false
    if (step.type === 'final') return form.name && form.phone && form.email
    return true
  }, [step, form])

  const handleQty = useCallback((id: string, d: number) => {
    setQtys((p) => {
      const c = p[id] || 0
      const n = Math.max(0, c + d)
      if (n === 0) { const next = { ...p }; delete next[id]; return next }
      return { ...p, [id]: n }
    })
  }, [])

  const handleSel = useCallback((id: string) => {
    setSels((p) => {
      if (step?.type === 'single-select') {
        const next = { ...p }
        for (const item of step.items) {
          delete next[item.id]
        }
        return { ...next, [id]: 1 }
      }
      if (p[id]) { const next = { ...p }; delete next[id]; return next }
      return { ...p, [id]: 1 }
    })
  }, [step])

  const next = useCallback(() => {
    if (!canGo) return
    if (stepIdx < visibleSteps.length - 1) {
      if (visibleSteps[stepIdx + 1]?.type === 'final') setLastStep(stepIdx)
      setStepIdx((i) => i + 1)
    }
  }, [canGo, stepIdx, visibleSteps])

  const prev = useCallback(() => {
    if (stepIdx > 0) { setStepIdx((i) => i - 1) }
  }, [stepIdx])

  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [stepIdx])

  const doPdf = useCallback(() => {
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, message: `Quote: ${fmt(total)} | Date: ${form.date || '—'} | Venue: ${form.venue || '—'}` }),
    }).catch(() => {})
    const doc = buildPdf(form, total, summary, logoDataUrl || undefined)
    doc.save(`VIP-${form.name.replace(/\s+/g, '-') || 'quote'}.pdf`)
  }, [form, total, summary, logoDataUrl])

  const doWhatsApp = useCallback(() => {
    if (!form.name || !form.phone || !form.email) return
    setDone(true)
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, message: `Quote: ${fmt(total)} | Date: ${form.date || '—'} | Venue: ${form.venue || '—'}` }),
    }).catch(() => {})
    const msg = [
      `*New Quote from VIP Studios*`,
      `Name: ${form.name}`,
      `Date: ${form.date || '—'}`,
      `Venue: ${form.venue || '—'}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Total: ${fmt(total)}`,
      ``,
      `*Selected:*`,
      ...summary.map((i) => `- ${i.name}${i.qty > 1 ? ` x${i.qty}` : ''}: ${fmt(i.price)}`),
    ].join('\n')
    window.open(`https://wa.me/919299950999?text=${encodeURIComponent(msg)}`, '_blank')
    doPdf()
  }, [form, total, summary, doPdf])

  if (!loadedSteps) {
    return (
      <div style={{ backgroundColor: '#F6F1E6' }} className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-lg">Loading quote builder...</p>
      </div>
    )
  }

  function renderQtyCard(item: StepItem) {
    const q = qtys[item.id] || 0
    const selected = q > 0
    const toggle = () => {
      if (selected) {
        setQtys((p) => { const next = { ...p }; delete next[item.id]; return next })
      } else {
        setQtys((p) => ({ ...p, [item.id]: 1 }))
      }
    }
    return (
      <div key={item.id} onClick={toggle}
        className={cn(
          'flex flex-col items-center gap-2 p-4 sm:p-5 rounded-xl border-2 transition-all w-full sm:w-auto min-w-0 sm:min-w-[150px] cursor-pointer',
          selected ? 'border-[#dc143c] bg-[#dc143c]/5 scale-[1.03] shadow-md' : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm hover:shadow'
        )}
      >
        <div className="relative w-16 h-16 pointer-events-none">
          <Image src={item.image} alt={item.name} fill className={cn('object-contain', selected ? 'scale-110' : '')} />
        </div>
        <span className={cn('text-xs font-semibold text-center leading-tight pointer-events-none', selected ? 'text-[#dc143c]' : 'text-gray-800')}>{item.name}</span>
        <span className={cn('text-[11px] pointer-events-none', selected ? 'text-[#dc143c]' : 'text-gray-400')}>{item.price === 0 ? 'FREE' : fmt(item.price)}</span>
        {selected && (
          <div className="flex items-center gap-2 mt-1" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => handleQty(item.id, -1)} className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 font-bold hover:bg-gray-200 flex items-center justify-center text-sm leading-none">&minus;</button>
            <span className="w-5 text-center font-bold text-sm">{q}</span>
            <button onClick={() => handleQty(item.id, 1)} className="w-7 h-7 rounded-full text-white font-bold flex items-center justify-center text-sm leading-none" style={{ backgroundColor: '#dc143c' }}>+</button>
          </div>
        )}
      </div>
    )
  }

  function renderOptCard(item: StepItem) {
    const sel = sels[item.id] === 1
    return (
      <button key={item.id} onClick={() => handleSel(item.id)}
        className={cn(
          'flex flex-col items-center gap-3 p-4 sm:p-6 rounded-xl border-2 transition-all w-full sm:w-auto min-w-0 sm:min-w-[155px]',
          sel ? 'border-[#dc143c] bg-[#dc143c]/5 scale-[1.03] shadow-md' : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm hover:shadow'
        )}
      >
        <div className="relative w-20 h-20">
          <Image src={item.image} alt={item.name} fill className={cn('object-contain', sel ? 'scale-110' : '')} />
        </div>
        <span className={cn('text-sm font-semibold text-center', sel ? 'text-[#dc143c]' : 'text-gray-800')}>{item.name}</span>
        {item.price === 0 && <span className="text-xs text-green-600 font-medium">FREE</span>}
        {item.price > 0 && <span className="text-xs text-gray-400">+{fmt(item.price)}</span>}
        {item.price < 0 && <span className="text-xs text-green-600">Save {fmt(Math.abs(item.price))}</span>}
      </button>
    )
  }

  function renderContent() {
    if (!step) return null

    if (step.type === 'welcome') {
      return (
        <div className="text-center py-16">
          <div className="relative w-24 h-24 mx-auto mb-5">
            <Image src="/quotes/photo.png" alt="quote" fill className="object-contain" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{step.title}</h1>
          {step.subtitle && <p className="text-gray-500 max-w-lg mx-auto mb-8 text-sm">{step.subtitle}</p>}
          <button onClick={next} className="text-white font-semibold px-10 py-3.5 rounded-full text-base shadow-lg hover:brightness-110 transition" style={{ backgroundColor: '#dc143c' }}>GET STARTED</button>
        </div>
      )
    }

    if (step.type === 'multi-quantity') {
      return (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{step.title}</h2>
            {step.subtitle && <p className="text-gray-500 text-sm mt-1">{step.subtitle}</p>}
          </div>
          <div className="flex flex-wrap gap-4 justify-center">{step.items.map(renderQtyCard)}</div>
        </div>
      )
    }

    if (step.type === 'single-select') {
      return (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{step.title}</h2>
            {step.subtitle && <p className="text-gray-500 text-sm mt-1">{step.subtitle}</p>}
          </div>
          <div className="flex flex-wrap gap-6 justify-center">{step.items.map(renderOptCard)}</div>
        </div>
      )
    }

    if (step.type === 'final') {
      return (
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{step.title}</h2>
            <p className="text-gray-500 text-sm">{step.subtitle}</p>
            <div className="text-3xl font-bold mt-3" style={{ color: '#dc143c' }}>{fmt(total)}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4 space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm">Your Details</h3>
            <input type="text" placeholder="Your full name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm outline-none focus:border-[#dc143c] focus:ring-1 focus:ring-[#dc143c]/20" />
            <input type="date" placeholder="Wedding Date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm outline-none focus:border-[#dc143c] focus:ring-1 focus:ring-[#dc143c]/20" />
            <input type="text" placeholder="Wedding Venue Location" value={form.venue} onChange={(e) => setForm((f) => ({ ...f, venue: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm outline-none focus:border-[#dc143c] focus:ring-1 focus:ring-[#dc143c]/20" />
            <input type="tel" placeholder="Enter your Phone number" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm outline-none focus:border-[#dc143c] focus:ring-1 focus:ring-[#dc143c]/20" />
            <input type="email" placeholder="Enter your email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm outline-none focus:border-[#dc143c] focus:ring-1 focus:ring-[#dc143c]/20" />
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
            <h3 className="font-semibold text-gray-900 text-sm mb-3">Summary</h3>
            <div className="divide-y divide-gray-100 text-sm">
              {summary.map((item, i) => (
                <div key={i} className="flex justify-between py-1.5">
                  <span className="text-gray-600">{item.name}{item.qty > 1 ? ` x${item.qty}` : ''}</span>
                  <span className="font-medium">{fmt(item.price)}</span>
                </div>
              ))}
              <div className="flex justify-between py-2 font-bold text-base">
                <span>Total</span>
                <span style={{ color: '#dc143c' }}>{fmt(total)}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={doPdf} disabled={!form.name || !form.phone || !form.email}
              className="flex-1 py-3 rounded-full font-semibold text-sm border-2 transition disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#dc143c] hover:text-white"
              style={{ borderColor: '#dc143c', color: '#dc143c' }}
            >Download PDF</button>
            <button onClick={doWhatsApp} disabled={!form.name || !form.phone || !form.email}
              className="flex-1 py-3 rounded-full font-semibold text-sm text-white transition disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110"
              style={{ backgroundColor: '#dc143c' }}
            >Send via WhatsApp</button>
          </div>
          {done && <p className="text-center text-green-600 mt-4 text-sm font-medium">Thank you! We will get back to you shortly.</p>}
        </div>
      )
    }

    return null
  }

  if (!step) return null

  return (
    <div style={{ backgroundColor: '#F6F1E6' }} className="min-h-screen">
      <div ref={topRef} className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          {step.type !== 'welcome' && step.type !== 'final' && (
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <span className="text-xs text-gray-400">
                Step {visibleSteps.filter((s) => s.type !== 'welcome' && s.type !== 'final').indexOf(step) + 1} / {visibleSteps.filter((s) => s.type !== 'welcome' && s.type !== 'final').length}
              </span>
              <span className="text-base font-bold" style={{ color: '#dc143c' }}>{fmt(total)}</span>
            </div>
          )}
          {renderContent()}
          {step.type !== 'welcome' && step.type !== 'final' && (
            <div className="flex justify-between mt-8 pt-5 border-t border-gray-100">
              <button onClick={prev} className="px-6 py-2.5 rounded-full border-2 text-sm font-medium transition"
                style={{ borderColor: '#dc143c', color: '#dc143c' }}
              >Previous step</button>
              <button onClick={next} disabled={!canGo}
                className={cn('px-5 md:px-8 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition', canGo ? 'text-white shadow-md hover:brightness-110' : 'bg-gray-200 text-gray-400 cursor-not-allowed')}
                style={canGo ? { backgroundColor: '#dc143c' } : {}}
              >Next step</button>
              <button onClick={() => { setLastStep(stepIdx); setStepIdx(visibleSteps.length - 1) }} className="text-[10px] md:text-xs font-semibold text-[#dc143c] border border-[#dc143c] rounded-full px-2 md:px-3 py-1 hover:bg-[#dc143c] hover:text-white transition">
                Skip to total
              </button>
            </div>
          )}
          {step.type === 'final' && (
            <div className="flex justify-center mt-8 pt-5 border-t border-gray-100">
              <button onClick={() => setStepIdx(lastStep)} className="px-4 md:px-6 py-2 md:py-2.5 rounded-full border-2 text-xs md:text-sm font-medium transition"
                style={{ borderColor: '#dc143c', color: '#dc143c' }}
              >Back to select more</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
