import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Github, Linkedin, Mail, ArrowDown, FileText } from 'lucide-react'
import { profile } from '../data/portfolio'
import Skeleton from './Skeleton'

const Hero3D = lazy(() => import('./Hero3D'))

class Boundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

function CssFallback() {
  return (
    <div className="orb-fallback" aria-hidden="true">
      <div className="orb" />
      <svg viewBox="0 0 200 200" className="orb-rings">
        <circle cx="100" cy="100" r="92" /><circle cx="100" cy="100" r="72" />
      </svg>
    </div>
  )
}

export default function Hero({ ready, caps, onNav }) {
  const root = useRef(null)
  const [imgLoaded, setImgLoaded] = useState(false)
  const use3D = caps.tier !== 'low'

  useEffect(() => {
    if (!ready || caps.reduced) return
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.h-label', { y: 16, opacity: 0, duration: 0.5 })
        .from('.h-char', { yPercent: 110, opacity: 0, stagger: 0.04, duration: 0.6 }, '-=0.2')
        .from('.h-title', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
        .from('.h-desc', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
        .from('.h-cta > *', { y: 16, opacity: 0, stagger: 0.08, duration: 0.4, clearProps: 'all' }, '-=0.3')
        .from('.h-social > *', { y: 12, opacity: 0, stagger: 0.06, duration: 0.4 }, '-=0.2')
        .from('.hero-visual', { scale: 0.92, opacity: 0, duration: 0.9 }, 0.2)
    }, root)
    return () => ctx.revert()
  }, [ready, caps.reduced])

  return (
    <section id="home" ref={root} className="hero" aria-labelledby="hero-name">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-text">
          <p className="h-label eyebrow"><span className="pulse" /> {profile.label}</p>
          <h1 id="hero-name" aria-label={profile.name}>
            <span className="h-name" aria-hidden="true">
              {profile.name.split('').map((c, i) => (
                <span key={i} className="h-mask"><span className="h-char">{c === ' ' ? '\u00A0' : c}</span></span>
              ))}
            </span>
          </h1>
          <p className="h-title hero-role"><strong>{profile.title}</strong> · {profile.role}</p>
          <p className="h-desc lead">{profile.intro}</p>
          <div className="h-cta cta-row">
            <a href={profile.resume} target="_blank" rel="noreferrer" className="btn" data-magnetic><FileText size={18} aria-hidden="true" /> View Resume</a>
            <a href="#contact" className="btn btn-ghost" data-magnetic onClick={(e) => { e.preventDefault(); onNav('contact') }}>Contact Me</a>
          </div>
          <ul className="h-social social" aria-label="Social links">
            <li><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><Linkedin size={20} /></a></li>
            <li><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github size={20} /></a></li>
            <li><a href={`mailto:${profile.email}`} aria-label="Send an email"><Mail size={20} /></a></li>
          </ul>
        </div>

        <div className="hero-visual">
          {use3D ? (
            <Boundary fallback={<CssFallback />}>
              <Suspense fallback={<Skeleton round className="visual-skel" />}>
                <Hero3D tier={caps.tier} mobile={caps.mobile} />
              </Suspense>
            </Boundary>
          ) : <CssFallback />}
          <div className="photo" data-parallax>
            {!imgLoaded && <Skeleton round className="photo-skel" />}
            <img src={profile.photo} alt={`Portrait of ${profile.name}`} width="1024" height="1024" decoding="async" onLoad={() => setImgLoaded(true)} style={{ opacity: imgLoaded ? 1 : 0 }} />
          </div>
        </div>
      </div>
      <a href="#about" className="scroll-hint" aria-label="Scroll to About" onClick={(e) => { e.preventDefault(); onNav('about') }}><ArrowDown size={18} /></a>
    </section>
  )
}
