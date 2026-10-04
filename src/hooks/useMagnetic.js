import { useEffect } from 'react'
import gsap from 'gsap'

// Magnetic pull for [data-magnetic] elements (desktop, non-low tiers only)
export default function useMagnetic(enabled) {
  useEffect(() => {
    if (!enabled) return
    const cleanups = []
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      const move = (e) => {
        const r = el.getBoundingClientRect()
        gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25, duration: 0.4, ease: 'power3.out' })
      }
      const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' })
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
      cleanups.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) })
    })
    return () => cleanups.forEach((c) => c())
  }, [enabled])
}
