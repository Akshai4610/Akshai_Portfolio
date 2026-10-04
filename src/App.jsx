import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import usePerformanceTier from './hooks/usePerformanceTier'
import useMagnetic from './hooks/useMagnetic'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'
import Hero from './components/Hero'
import ResumeSection from './sections/ResumeSection'
import Contact from './sections/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const caps = usePerformanceTier()
  const [ready, setReady] = useState(false)
  const [active, setActive] = useState('home')
  const lenisRef = useRef(null)
  const richMotion = !caps.reduced && caps.tier !== 'low'
  const desktopFx = richMotion && caps.finePointer

  const links = useMemo(() => [
    { id: 'home', label: 'Home' }, { id: 'about', label: 'About' }, { id: 'contact', label: 'Contact' },
  ], [])

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id)
    if (!el) return
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: id === 'home' ? 0 : -64 })
    else el.scrollIntoView({ behavior: caps.reduced ? 'auto' : 'smooth' })
  }, [caps.reduced])

  // No scrolling under the loader; start at the very top when it lifts
  useEffect(() => {
    const root = document.documentElement
    if (ready) { root.classList.remove('is-loading'); return }
    root.classList.add('is-loading')
    window.scrollTo(0, 0)
  }, [ready])

  // Lenis + ScrollTrigger (fine-pointer devices on capable tiers only; native scroll otherwise)
  useEffect(() => {
    if (!desktopFx) return
    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(tick); lenis.destroy(); lenisRef.current = null }
  }, [desktopFx])

  // Scroll-triggered reveals. Content is visible by default; animation is only an enhancement.
  useEffect(() => {
    if (!ready || caps.reduced) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) =>
        gsap.from(el, { y: 36, opacity: 0, duration: 0.8, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: el, start: 'top 90%', once: true } }))
      gsap.utils.toArray('[data-stagger]').forEach((g) =>
        gsap.from(g.children, { y: 32, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: g, start: 'top 88%', once: true } }))
      if (caps.tier === 'high') {
        gsap.utils.toArray('[data-parallax]').forEach((el) =>
          gsap.to(el, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: el, scrub: true } }))
      }
    })
    const r = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => { clearTimeout(r); ctx.revert() }
  }, [ready, caps.reduced, caps.tier])

  // Active section indicator
  useEffect(() => {
    const els = links.map((l) => document.getElementById(l.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [links])

  useMagnetic(ready && desktopFx)

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <LoadingScreen reduced={caps.reduced} onStart={() => setReady(true)} />
      {desktopFx && <Cursor />}
      <Navbar links={links} active={active} onNav={scrollTo} />
      <main id="main">
        <Hero ready={ready} caps={caps} onNav={scrollTo} />
        <ResumeSection />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
