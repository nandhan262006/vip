'use client'

import { useEffect, useState } from 'react'

const ABOUT_FIELDS = [
  { key: 'aboutHeroTitle', label: 'Hero Title', placeholder: 'Best Photographer in Nellore — Vijay Kumar' },
  { key: 'aboutHeroDescription', label: 'Hero Description', placeholder: 'National Award Winning Wedding Photographer with 25+ years...' },
  { key: 'aboutImage', label: 'Photographer Image URL', placeholder: '/unnamed (4).webp' },
  { key: 'aboutName', label: 'Photographer Name', placeholder: 'Vijay' },
  { key: 'aboutRole', label: 'Photographer Role', placeholder: 'Founder of VIP Studios' },
  { key: 'aboutSectionLabel', label: 'Section Label', placeholder: 'About' },
  { key: 'aboutSubheading', label: 'Subheading', placeholder: 'VIP Studios' },
  { key: 'aboutBio', label: 'Bio (paragraphs separated by blank line)', placeholder: 'Before VIP Studios, I earned a National Award...\n\nI\'m Vijay, founder of VIP Studios...' },
  { key: 'aboutCtaHeading', label: 'CTA Heading', placeholder: 'Book the Best Photographer in Nellore' },
  { key: 'aboutCtaDescription', label: 'CTA Description', placeholder: 'Ready to have the best photographer in Nellore capture your wedding story?' },
]

export default function AdminAboutPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => { fetch('/api/admin/settings').then(r => r.json()).then(setSettings) }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (!res.ok) throw new Error('Save failed')
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error('Save error:', err)
      alert('Failed to save settings.')
    } finally {
      setSaving(false)
    }
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
        <h1 className="text-2xl font-bold text-gray-900">About Page</h1>
        <button onClick={handleSave} disabled={saving}
          className="bg-red text-white px-6 py-2 rounded-lg font-medium hover:bg-red-dark transition disabled:opacity-50">
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save All'}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid gap-5">
          {ABOUT_FIELDS.map(f => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
              {f.key === 'aboutImage' ? (
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
              ) : f.key === 'aboutBio' ? (
                <textarea
                  value={settings[f.key] || ''}
                  onChange={e => handleChange(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  rows={6}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm resize-y"
                />
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
