import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { profile } from '../data/portfolio'

export default function LoadingScreen({ onStart, reduced }) {
  const root = useRef(null)
  const bar = useRef(null)
  const [pct, setPct] = useState(0)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const state = { v: 0 }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.from('.ld-initials span', { yPercent: 110, opacity: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out' })
        .to(state, { v: 100, duration: reduced ? 0.3 : 0.9, ease: 'power1.inOut',
          onUpdate: () => { setPct(Math.round(state.v)); if (bar.current) bar.current.style.transform = `scaleX(${state.v / 100})` } }, 0.1)
        .add(() => onStart())
        .to(root.current, { yPercent: -100, duration: reduced ? 0.2 : 0.7, ease: 'power4.inOut', onComplete: () => setGone(true) })
    }, root)
    return () => ctx.revert()
  }, [])

  if (gone) return null
  return (
    <div ref={root} className="loader" role="status" aria-label="Loading portfolio">
      <div className="ld-initials" aria-hidden="true">
        {profile.initials.split('').map((c, i) => <span key={i}>{c}</span>)}
      </div>
      <p className="ld-name">{profile.name}</p>
      <div className="ld-track"><div ref={bar} className="ld-bar" /></div>
      <p className="ld-pct" aria-hidden="true">{pct}%</p>
    </div>
  )
}
