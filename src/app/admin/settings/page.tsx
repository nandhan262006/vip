'use client'

import { useEffect, useState } from 'react'

const SETTINGS_FIELDS = [
  { key: 'whatsapp', label: 'WhatsApp Number', placeholder: '919299950999' },
  { key: 'phone', label: 'Phone Number', placeholder: '+919299950999' },
  { key: 'email', label: 'Email', placeholder: 'contact@vipstudio.com' },
  { key: 'address', label: 'Address', placeholder: '26-1-1639, beside MGB Mall...' },
  { key: 'instagram', label: 'Instagram URL', placeholder: 'https://www.instagram.com/...' },
  { key: 'facebook', label: 'Facebook URL', placeholder: 'https://www.facebook.com/...' },
  { key: 'youtube', label: 'YouTube URL', placeholder: 'https://www.youtube.com/...' },
  { key: 'googleMaps', label: 'Google Maps URL', placeholder: 'https://maps.app.goo.gl/...' },
  { key: 'heroTitle', label: 'Hero Title', placeholder: 'Best Photographer in Nellore' },
  { key: 'heroSubtitle', label: 'Hero Subtitle', placeholder: 'VIP Studio Wedding Photography' },
  { key: 'seoTitle', label: 'SEO Title', placeholder: 'Best Photographer in Nellore | VIP Studio' },
  { key: 'seoDescription', label: 'SEO Description', placeholder: 'National Award Winning...' },
  { key: 'seoKeywords', label: 'SEO Keywords (JSON array)', placeholder: '["best photographer..."]' },
]

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [saved, setSaved] = useState(false)

  useEffect(() => { fetch('/api/admin/settings').then(r => r.json()).then(setSettings) }, [])

  const handleSave = async () => {
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleChange = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
        <button onClick={handleSave}
          className="bg-red text-white px-6 py-2 rounded-lg font-medium hover:bg-red-dark transition">
          {saved ? 'Saved!' : 'Save All'}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid gap-5">
          {SETTINGS_FIELDS.map(f => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
              <input
                value={settings[f.key] || ''}
                onChange={e => handleChange(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
