'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Step = 1 | 2 | 3

interface FormData {
  name: string
  email: string
  phone: string
  city: string
  serviceType: string
  password: string
  confirmPassword: string
}

const services = ['Home Wiring', 'Panel Upgrade', 'Lighting', 'Safety Inspection', 'Emergency Repair', 'Industrial Work']
const cities = ['Ludhiana', 'Jalandhar', 'Amritsar', 'Patiala', 'Mohali', 'Bathinda', 'Other']

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', city: '',
    serviceType: '', password: '', confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const update = (field: keyof FormData, val: string) => setForm(prev => ({ ...prev, [field]: val }))

  function validateStep(): boolean {
    setError('')
    if (step === 1) {
      if (!form.name.trim()) { setError('Please enter your full name.'); return false }
      if (!form.email.trim() || !form.email.includes('@')) { setError('Please enter a valid email.'); return false }
      if (!form.phone.trim() || form.phone.length < 10) { setError('Please enter a valid 10-digit phone number.'); return false }
    }
    if (step === 2) {
      if (!form.city) { setError('Please select your city.'); return false }
      if (!form.serviceType) { setError('Please select a service type.'); return false }
    }
    if (step === 3) {
      if (!form.password || form.password.length < 6) { setError('Password must be at least 6 characters.'); return false }
      if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return false }
    }
    return true
  }

  function nextStep() {
    if (validateStep()) setStep(prev => (prev + 1) as Step)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateStep()) return
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          city: form.city,
          serviceType: form.serviceType,
          password: form.password,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Registration failed.'); setLoading(false); return }
      router.push('/login')
    } catch {
      setError('Something went wrong. Try again.')
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '14px 16px', borderRadius: 10,
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff', fontSize: 15, outline: 'none',
  }

  const labelStyle = {
    display: 'block' as const, fontSize: 13, fontWeight: 500,
    color: 'rgba(255,255,255,0.6)' as const, marginBottom: 8
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      fontFamily: "'Inter', sans-serif",
      background: '#0a0a0f'
    }}>
      {/* Left info panel */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '60px 5%',
        background: 'linear-gradient(135deg, rgba(255,200,0,0.06) 0%, transparent 60%)',
        borderRight: '1px solid rgba(255,200,0,0.1)'
      }}>
        <Link href="/" style={{ textDecoration: 'none', marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 40, height: 40,
              background: 'linear-gradient(135deg, #FFC800, #FF8C00)',
              borderRadius: 10, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 20
            }}>⚡</div>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>
              Kamboj<span style={{ color: '#FFC800' }}>Electrical</span>
            </span>
          </div>
        </Link>

        <h1 style={{ fontSize: 40, fontWeight: 800, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
          Get started<br />
          <span style={{ color: '#FFC800' }}>for free.</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', marginTop: 16, fontSize: 16, lineHeight: 1.7 }}>
          Register in 3 simple steps and get access to Punjab's best electrical services.
        </p>

        {/* Steps indicator (left) */}
        <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { num: 1, label: 'Personal Details', desc: 'Name, email & phone' },
            { num: 2, label: 'Service Preference', desc: 'City & service type' },
            { num: 3, label: 'Create Password', desc: 'Secure your account' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: step > s.num ? 'linear-gradient(135deg, #FFC800, #FF8C00)'
                    : step === s.num ? 'rgba(255,200,0,0.2)' : 'rgba(255,255,255,0.06)',
                  border: `2px solid ${step >= s.num ? '#FFC800' : 'rgba(255,255,255,0.1)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 700,
                  color: step > s.num ? '#000' : step === s.num ? '#FFC800' : 'rgba(255,255,255,0.3)',
                  transition: 'all 0.3s', flexShrink: 0
                }}>{step > s.num ? '✓' : s.num}</div>
                {i < 2 && <div style={{
                  width: 2, height: 40, margin: '4px 0',
                  background: step > s.num ? '#FFC800' : 'rgba(255,255,255,0.08)',
                  transition: 'background 0.3s'
                }} />}
              </div>
              <div style={{ paddingTop: 6, paddingBottom: i < 2 ? 40 : 0 }}>
                <div style={{
                  fontSize: 14, fontWeight: 600,
                  color: step === s.num ? '#fff' : 'rgba(255,255,255,0.4)'
                }}>{s.label}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Form Slider */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '60px 5%'
      }}>
        <div style={{ width: '100%', maxWidth: 440 }}>
          {/* Progress bar */}
          <div style={{
            height: 4, background: 'rgba(255,255,255,0.08)',
            borderRadius: 4, marginBottom: 40, overflow: 'hidden'
          }}>
            <div style={{
              height: '100%', borderRadius: 4,
              background: 'linear-gradient(90deg, #FFC800, #FF8C00)',
              width: `${(step / 3) * 100}%`,
              transition: 'width 0.4s ease'
            }} />
          </div>

          <div style={{ marginBottom: 8, fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
            Step {step} of 3
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
            {step === 1 ? 'Your Details' : step === 2 ? 'Service Info' : 'Set Password'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginBottom: 36 }}>
            {step === 1 ? "Let's start with your basic information"
              : step === 2 ? 'Help us understand what you need'
                : 'Almost done! Secure your account'}
          </p>

          {error && (
            <div style={{
              padding: '14px 18px', borderRadius: 10, marginBottom: 24,
              background: 'rgba(255,60,60,0.08)', border: '1px solid rgba(255,60,60,0.2)',
              color: '#ff6b6b', fontSize: 14
            }}>{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            {/* STEP 1 */}
            <div style={{ display: step === 1 ? 'flex' : 'none', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input style={inputStyle} placeholder="Rajesh Sharma" value={form.name}
                  onChange={e => update('name', e.target.value)}
                  onFocus={e => e.target.style.borderColor = 'rgba(255,200,0,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input style={inputStyle} type="email" placeholder="you@example.com" value={form.email}
                  onChange={e => update('email', e.target.value)}
                  onFocus={e => e.target.style.borderColor = 'rgba(255,200,0,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input style={inputStyle} type="tel" placeholder="98765 43210" value={form.phone}
                  onChange={e => update('phone', e.target.value)}
                  onFocus={e => e.target.style.borderColor = 'rgba(255,200,0,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>
            </div>

            {/* STEP 2 */}
            <div style={{ display: step === 2 ? 'flex' : 'none', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={labelStyle}>Your City</label>
                <select value={form.city} onChange={e => update('city', e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="" style={{ background: '#1a1a2e' }}>Select city...</option>
                  {cities.map(c => <option key={c} value={c} style={{ background: '#1a1a2e' }}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Service Type Needed</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {services.map(s => (
                    <button key={s} type="button" onClick={() => update('serviceType', s)} style={{
                      padding: '12px 14px', borderRadius: 10, fontSize: 13,
                      fontWeight: form.serviceType === s ? 600 : 400,
                      border: `1px solid ${form.serviceType === s ? 'rgba(255,200,0,0.5)' : 'rgba(255,255,255,0.1)'}`,
                      background: form.serviceType === s ? 'rgba(255,200,0,0.1)' : 'rgba(255,255,255,0.03)',
                      color: form.serviceType === s ? '#FFC800' : 'rgba(255,255,255,0.55)',
                      cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left'
                    }}>{s}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* STEP 3 */}
            <div style={{ display: step === 3 ? 'flex' : 'none', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={labelStyle}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input style={{ ...inputStyle, paddingRight: 48 }}
                    type={showPass ? 'text' : 'password'} placeholder="Min. 6 characters"
                    value={form.password} onChange={e => update('password', e.target.value)}
                    onFocus={e => e.target.style.borderColor = 'rgba(255,200,0,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                  <button type="button" onClick={() => setShowPass(!showPass)} style={{
                    position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
                    cursor: 'pointer', fontSize: 16
                  }}>{showPass ? '🙈' : '👁️'}</button>
                </div>
                {/* Password strength */}
                {form.password && (
                  <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                    {[1, 2, 3, 4].map(n => (
                      <div key={n} style={{
                        flex: 1, height: 3, borderRadius: 2,
                        background: form.password.length >= n * 2
                          ? n <= 2 ? '#ff6b6b' : n === 3 ? '#FFC800' : '#4ade80'
                          : 'rgba(255,255,255,0.1)',
                        transition: 'background 0.2s'
                      }} />
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label style={labelStyle}>Confirm Password</label>
                <input style={inputStyle} type="password" placeholder="Re-enter password"
                  value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)}
                  onFocus={e => e.target.style.borderColor = 'rgba(255,200,0,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>

              <div style={{
                padding: '14px 16px', borderRadius: 10,
                background: 'rgba(255,200,0,0.04)',
                border: '1px solid rgba(255,200,0,0.12)',
                fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6
              }}>
                By registering, you agree to our Terms of Service and Privacy Policy.
              </div>
            </div>

            {/* Navigation buttons */}
            <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
              {step > 1 && (
                <button type="button" onClick={() => setStep(prev => (prev - 1) as Step)} style={{
                  flex: 1, padding: '14px',
                  borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)',
                  background: 'transparent', color: '#fff',
                  fontSize: 15, fontWeight: 500, cursor: 'pointer'
                }}>← Back</button>
              )}
              {step < 3 ? (
                <button type="button" onClick={nextStep} style={{
                  flex: 2, padding: '14px', borderRadius: 10, border: 'none',
                  background: 'linear-gradient(135deg, #FFC800, #FF8C00)',
                  color: '#000', fontSize: 15, fontWeight: 700, cursor: 'pointer'
                }}>Continue →</button>
              ) : (
                <button type="submit" disabled={loading} style={{
                  flex: 2, padding: '14px', borderRadius: 10, border: 'none',
                  background: loading ? 'rgba(255,200,0,0.4)' : 'linear-gradient(135deg, #FFC800, #FF8C00)',
                  color: '#000', fontSize: 15, fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}>{loading ? 'Creating Account...' : 'Create Account ✓'}</button>
              )}
            </div>
          </form>

          <p style={{ marginTop: 28, textAlign: 'center', fontSize: 14, color: 'rgba(255,255,255,0.35)' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#FFC800', textDecoration: 'none', fontWeight: 500 }}>Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
