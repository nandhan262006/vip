'use client'

import { useEffect, useState } from 'react'

interface SettingField {
  key: string
  label: string
  placeholder?: string
  type?: 'text' | 'textarea' | 'image'
}

const SETTINGS_FIELDS: SettingField[] = [
  { key: 'whatsapp', label: 'WhatsApp Number', placeholder: '919299950999' },
  { key: 'phone', label: 'Phone Number', placeholder: '+919299950999' },
  { key: 'email', label: 'Email', placeholder: 'contact@vipstudio.com' },
  { key: 'address', label: 'Address', placeholder: '26-1-1639, beside MGB Mall...' },
  { key: 'instagram', label: 'Instagram URL', placeholder: 'https://www.instagram.com/...' },
  { key: 'facebook', label: 'Facebook URL', placeholder: 'https://www.facebook.com/...' },
  { key: 'youtube', label: 'YouTube URL', placeholder: 'https://www.youtube.com/...' },
  { key: 'googleMaps', label: 'Google Maps URL', placeholder: 'https://maps.app.goo.gl/...' },
  { key: 'heroTitle', label: 'Hero Title', placeholder: 'Best Photographer in Nellore' },
  { key: 'heroSubtitle', label: 'Hero Subtitle', placeholder: 'VIP Studios Wedding Photography' },
  { key: 'seoTitle', label: 'SEO Title', placeholder: 'Best Photographer in Nellore | VIP Studios' },
  { key: 'seoDescription', label: 'SEO Description', placeholder: 'National Award Winning...' },
  { key: 'seoKeywords', label: 'SEO Keywords (JSON array)', placeholder: '["best photographer..."]' },
  { key: 'aboutHeroTitle', label: 'About — Hero Title', placeholder: 'Best Photographer in Nellore — Vijay Kumar' },
  { key: 'aboutHeroDescription', label: 'About — Hero Description', placeholder: 'National Award Winning Wedding Photographer with 25+ years...' },
  { key: 'aboutImage', label: 'About — Photographer Image URL', type: 'image', placeholder: '/unnamed (4).webp' },
  { key: 'aboutName', label: 'About — Photographer Name', placeholder: 'Vijay' },
  { key: 'aboutRole', label: 'About — Photographer Role', placeholder: 'Founder of VIP Studios' },
  { key: 'aboutSectionLabel', label: 'About — Section Label', placeholder: 'About' },
  { key: 'aboutSubheading', label: 'About — Subheading', placeholder: 'VIP Studios' },
  { key: 'aboutBio', label: 'About — Bio (paragraphs separated by blank line)', type: 'textarea', placeholder: 'Before VIP Studios, I earned a National Award. Wedding Photographer of the Year 2010 (Kodak). 15 Years of Excellence.\n\nI\'m Vijay, founder of VIP Studios. With over 25 years of experience...\n\nThis National Award Winning Wedding Photography is a reminder...\n\nIf you\'re searching for the Best Wedding Photographers in Nellore...\n\nFor over 15 years, families across Nellore and beyond have trusted VIP Studios...' },
  { key: 'aboutCtaHeading', label: 'About — CTA Heading', placeholder: 'Book the Best Photographer in Nellore' },
  { key: 'aboutCtaDescription', label: 'About — CTA Description', placeholder: 'Ready to have the best photographer in Nellore capture your wedding story?' },
]

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [saved, setSaved] = useState(false)
  const [uploading, setUploading] = useState(false)

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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'about')
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      setSettings({ ...settings, aboutImage: data.url })
    } catch (err) {
      console.error('Upload error:', err)
      alert('Upload failed. Please check if the storage service is configured.')
    } finally {
      setUploading(false)
    }
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
              {f.type === 'textarea' ? (
                <textarea
                  value={settings[f.key] || ''}
                  onChange={e => handleChange(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  rows={6}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm resize-y"
                />
              ) : f.type === 'image' ? (
                <div>
                  <input type="file" accept="image/*" onChange={handleUpload} className="text-sm mb-2" />
                  {uploading && <span className="text-sm text-gray-500 ml-2">Uploading...</span>}
                  <input
                    value={settings[f.key] || ''}
                    onChange={e => handleChange(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm mt-1"
                  />
                  {settings[f.key] && (
                    <img src={settings[f.key]} alt="About preview" className="mt-2 h-32 rounded-lg object-cover" />
                  )}
                </div>
              ) : (
                <input
                  value={settings[f.key] || ''}
                  onChange={e => handleChange(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
