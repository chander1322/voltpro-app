'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './login.module.css'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Login failed.'); setLoading(false); return }
      localStorage.setItem('token', data.token)
      localStorage.setItem('userName', data.name)
      router.push('/')
    } catch {
      setError('Something went wrong. Try again.')
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      {/* Left Panel */}
      <div className={styles.leftPanel}>
        <Link href="/" className={styles.logoLink}>
          <div className={styles.logoRow}>
            <div className={styles.logoBox}>⚡</div>
            <span className={styles.logoText}>
              Kamboj<span className={styles.logoAccent}>Electrical</span>
            </span>
          </div>
        </Link>

        <h1 className={styles.heading}>
          Welcome<br />
          <span className={styles.headingAccent}>back.</span>
        </h1>
        <p className={styles.subtitle}>
          Log in to manage your electrical service requests and track your projects.
        </p>

        <div className={styles.featureList}>
          {[
            { icon: '🔒', text: 'Secure 256-bit encryption' },
            { icon: '⚡', text: 'Instant service request updates' },
            { icon: '📋', text: 'Track all your projects in one place' },
          ].map((item, i) => (
            <div key={i} className={styles.featureItem}>
              <div className={styles.featureIcon}>{item.icon}</div>
              <span className={styles.featureText}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className={styles.rightPanel}>
        <div className={styles.formWrapper}>
          <h2 className={styles.formTitle}>Sign in</h2>
          <p className={styles.formSubtitle}>
            Don't have an account?{' '}
            <Link href="/register" className={styles.signupLink}>
              Create one →
            </Link>
          </p>

          {error && <div className={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <label className={styles.label}>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className={styles.input}
              />
            </div>

            <div>
              <label className={styles.label}>Password</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className={`${styles.input} ${styles.passwordInput}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className={styles.toggleBtn}
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <div className={styles.helpBox}>
            <div className={styles.helpText}>📞 Need help? Call us</div>
            <div className={styles.helpPhone}>+91 98765 43210</div>
          </div>
        </div>
      </div>
    </div>
  )
}
