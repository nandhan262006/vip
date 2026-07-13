'use client'

import { useEffect, useState } from 'react'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ submissions: 0, unread: 0, galleries: 0, services: 0 })

  useEffect(() => {
    async function load() {
      const [subRes, galRes, svcRes] = await Promise.all([
        fetch('/api/admin/submissions'),
        fetch('/api/admin/galleries'),
        fetch('/api/admin/services'),
      ])
      const subs = await subRes.json() as { read: boolean }[]
      const gals = await galRes.json()
      const svcs = await svcRes.json()
      setStats({
        submissions: subs.length,
          unread: subs.filter((s) => !s.read).length,
        galleries: gals.length,
        services: svcs.length,
      })
    }
    load()
  }, [])

  const cards = [
    { label: 'Total Submissions', value: stats.submissions },
    { label: 'Unread Messages', value: stats.unread, highlight: stats.unread > 0 },
    { label: 'Galleries', value: stats.galleries },
    { label: 'Services', value: stats.services },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className={`text-3xl font-bold mt-1 ${card.highlight ? 'text-red' : 'text-gray-900'}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
