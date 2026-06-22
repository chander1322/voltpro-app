'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import styles from './home.module.css'

const services = [
  { icon: '⚡', title: 'Wiring & Rewiring', desc: 'Complete home and commercial wiring solutions with safety-first approach.' },
  { icon: '🔌', title: 'Panel Upgrades', desc: 'Modern electrical panel installation and upgrades for higher loads.' },
  { icon: '💡', title: 'Lighting Installation', desc: 'LED, smart, and decorative lighting for every space.' },
  { icon: '🛡️', title: 'Safety Inspections', desc: 'Certified electrical safety audits and compliance checks.' },
  { icon: '🔧', title: 'Emergency Repairs', desc: '24/7 rapid response for electrical faults and breakdowns.' },
  { icon: '🏭', title: 'Industrial Solutions', desc: 'Heavy-duty electrical work for factories and industrial plants.' },
]

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '3,200+', label: 'Projects Done' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Support Available' },
]

const testimonials = [
  { name: 'Rajesh Sharma', role: 'Home Owner, Kharar', text: 'Excellent work! They rewired my entire house in 2 days without any mess. Very professional team.' },
  { name: 'Priya Mehta', role: 'Restaurant Owner', text: 'Got our commercial kitchen wired perfectly. They handled every safety requirement without any issues.' },
  { name: 'Sukhwinder Singh', role: 'Factory Manager', text: 'We use them for all our industrial electrical needs. Fast, reliable, and very affordable.' },
]

const faqs = [
  { q: 'How quickly can you respond to emergencies?', a: 'We offer 24/7 emergency response and typically reach within 30-60 minutes in Kharar and surrounding areas.' },
  { q: 'Are your electricians certified?', a: 'Yes, all our electricians are government-certified with valid licenses and undergo regular safety training.' },
  { q: 'Do you provide a warranty on work?', a: 'We provide 1-year warranty on all electrical work and 5-year warranty on panel installations.' },
  { q: 'What areas do you cover?', a: 'We cover Kharar, Belongi, Mohali, Chandigarh and all nearby Area in these Locations.' },
]

const aboutFeatures = [
  { title: 'Licensed & Insured', desc: 'All work fully certified by Punjab Electricity Board' },
  { title: 'Transparent Pricing', desc: 'No hidden charges — get exact quote before work begins' },
  { title: 'Clean Work Guarantee', desc: 'We clean up completely after every job, no mess left behind' },
]

export default function HomePage() {
  const router = useRouter()
  const heroRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [user, setUser] = useState<{ name: string } | null>(null)

  useEffect(() => {
    const name = localStorage.getItem('userName')
    if (name) setUser({ name })
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    setUser(null)
    router.push('/login')
  }

  return (
    <>
      <style>{`* { margin: 0; padding: 0; box-sizing: border-box; } html { scroll-behavior: smooth; }`}</style>
      <div className={styles.page}>

        <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
          <div className={styles.navLogo}>
            <div className={styles.navLogoIcon}>⚡</div>
            <span className={styles.navLogoText}>Kamboj<span className={styles.navLogoAccent}>Electrical</span></span>
          </div>
          <div className={styles.navLinks}>
            {['Services', 'About', 'Testimonials', 'FAQ'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className={styles.navLink}>{item}</a>
            ))}
          </div>
          <div className={styles.navActions}>
            {user ? (
              <>
                <span className={styles.navWelcome}>Welcome, <span className={styles.navWelcomeName}>{user.name}</span></span>
                <button onClick={handleLogout} className={styles.navLogoutBtn}>Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className={styles.navLoginBtn}>Login</Link>
                <Link href="/register" className={styles.navRegisterBtn}>Register</Link>
              </>
            )}
          </div>
        </nav>

        <section className={styles.hero} ref={heroRef}>
          <div className={styles.heroGrid} />
          <div className={styles.heroInner}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              <span className={styles.heroBadgeText}>24/7 Emergency Service Available</span>
            </div>
            <h1 className={styles.heroTitle}>
              Punjab&apos;s Most
              <span className={styles.heroTitleGradient}>Trusted Electrical</span>
              Service
            </h1>
            <p className={styles.heroSubtitle}>
              Professional electrical solutions for homes, businesses and industries across Kharar Mohali, Punjab. Certified, safe, and built to last.
            </p>
            <div className={styles.heroBtns}>
              <Link href="/register" className={styles.heroPrimaryBtn}>Get Free Quote ⚡</Link>
              <a href="#services" className={styles.heroSecondaryBtn}>View Services</a>
            </div>
            <div className={styles.statsGrid}>
              {stats.map((s, i) => (
                <div key={i} className={styles.statItem}>
                  <div className={styles.statValue}>{s.value}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className={styles.services}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>What We Do</span>
              <h2 className={styles.sectionTitle}>Complete Electrical Solutions</h2>
              <p className={styles.sectionSubtitle}>From simple repairs to full industrial setups</p>
            </div>
            <div className={styles.servicesGrid}>
              {services.map((s, i) => (
                <div key={i} className={styles.serviceCard}>
                  <div className={styles.serviceIcon}>{s.icon}</div>
                  <h3 className={styles.serviceTitle}>{s.title}</h3>
                  <p className={styles.serviceDesc}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className={styles.about}>
          <div className={styles.aboutGrid}>
            <div>
              <span className={styles.aboutTag}>Why Choose Us</span>
              <h2 className={styles.aboutTitle}>Safety. Speed.<br /><span className={styles.aboutTitleAccent}>Quality Work.</span></h2>
              <p className={styles.aboutDesc}>With over 10+ years in the electrical industry across Punjab, VoltPro has earned the trust of thousands of homes and businesses. We don&apos;t just fix problems — we build electrical systems that last decades.</p>
              <div className={styles.aboutFeatures}>
                {aboutFeatures.map((item, i) => (
                  <div key={i} className={styles.aboutFeatureItem}>
                    <div className={styles.aboutCheckIcon}>✓</div>
                    <div>
                      <div className={styles.aboutFeatureTitle}>{item.title}</div>
                      <div className={styles.aboutFeatureDesc}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.aboutCard}>
              <div className={styles.aboutCardBadge}>Since 2015</div>
              <span className={styles.aboutCardEmoji}>⚡</span>
              <h3 className={styles.aboutCardTitle}>Ready for any scale</h3>
              <p className={styles.aboutCardDesc}>From a single bulb replacement to complete industrial wiring of a 50,000 sq ft factory — our team handles it all with the same dedication and precision.</p>
              <div className={styles.aboutCardPhone}>
                <div className={styles.aboutCardPhoneLabel}>📞 Emergency Helpline</div>
                <div className={styles.aboutCardPhoneNumber}>+91 80542 99660</div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className={styles.testimonials}>
          <div className={styles.testimonialsInner}>
            <span className={styles.sectionTag}>Testimonials</span>
            <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
            <div className={styles.testimonialSlider}>
              {testimonials.map((t, i) => (
                <div key={i} className={i === activeTestimonial ? styles.testimonialSlideActive : styles.testimonialSlide}>
                  <div className={styles.testimonialCard}>
                    <span className={styles.testimonialQuote}>&ldquo;</span>
                    <p className={styles.testimonialText}>{t.text}</p>
                    <div className={styles.testimonialAuthor}>
                      <div className={styles.testimonialName}>{t.name}</div>
                      <div className={styles.testimonialRole}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.testimonialDots}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)}
                  className={`${styles.testimonialDot} ${i === activeTestimonial ? styles.testimonialDotActive : ''}`}
                  style={{ width: i === activeTestimonial ? 32 : 8 }} aria-label={`Testimonial ${i + 1}`} />
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className={styles.faq}>
          <div className={styles.faqInner}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>FAQ</span>
              <h2 className={styles.sectionTitle}>Common Questions</h2>
            </div>
            <div className={styles.faqList}>
              {faqs.map((f, i) => (
                <div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.faqItemOpen : ''}`}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className={styles.faqBtn}>
                    {f.q}
                    <span className={`${styles.faqIcon} ${openFaq === i ? styles.faqIconOpen : ''}`}>+</span>
                  </button>
                  {openFaq === i && <div className={styles.faqAnswer}>{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>Need Electrical Work Done?</h2>
          <p className={styles.ctaSubtitle}>Register today and get a free consultation from our certified electricians.</p>
          <div className={styles.ctaBtns}>
            <Link href="/register" className={styles.ctaPrimaryBtn}>Register Now — Free Quote</Link>
            <a href="tel:+918054299660" className={styles.ctaSecondaryBtn}>📞 Call Us Now</a>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerLogo}>
            <span>⚡</span>
            <span className={styles.footerLogoText}>Kamboj<span className={styles.footerLogoAccent}>Electrical</span></span>
          </div>
          <div className={styles.footerCopy}>© 2026 Kamboj Electrical Services. All rights reserved. Punjab, India.</div>
          <div className={styles.footerLinks}>
            <Link href="/login" className={styles.footerLink}>Login</Link>
            <Link href="/register" className={styles.footerLink}>Register</Link>
          </div>
        </footer>

      </div>
    </>
  )
}
