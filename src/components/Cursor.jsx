import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    const xd = gsap.quickTo(dot.current, 'x', { duration: 0.1 })
    const yd = gsap.quickTo(dot.current, 'y', { duration: 0.1 })
    const xr = gsap.quickTo(ring.current, 'x', { duration: 0.4, ease: 'power3' })
    const yr = gsap.quickTo(ring.current, 'y', { duration: 0.4, ease: 'power3' })
    const move = (e) => { xd(e.clientX); yd(e.clientY); xr(e.clientX); yr(e.clientY); ring.current.style.opacity = 1; dot.current.style.opacity = 1 }
    const over = (e) => {
      const t = e.target.closest('[data-cursor="project"], a, button, input, textarea')
      ring.current.className = 'cursor-ring' + (t ? (t.dataset.cursor === 'project' ? ' is-project' : ' is-hover') : '')
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over, { passive: true })
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerover', over) }
  }, [])

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
