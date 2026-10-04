import { useEffect, useState } from 'react'
import { Menu, X, FileText } from 'lucide-react'
import { profile } from '../data/portfolio'

export default function Navbar({ links, active, onNav }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [])

  const go = (e, id) => { e.preventDefault(); setOpen(false); onNav(id) }

  return (
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <nav className="nav-inner" aria-label="Primary">
        <a href="#home" className="logo" onClick={(e) => go(e, 'home')} aria-label={`${profile.name} – home`}>
          <span className="logo-mark">{profile.initials}</span>
        </a>
        <ul id="menu" className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className={active === l.id ? 'active' : ''} aria-current={active === l.id ? 'true' : undefined} onClick={(e) => go(e, l.id)}>
                {l.label}
              </a>
            </li>
          ))}
          <li className="nav-resume">
            <a href={profile.resume} target="_blank" rel="noreferrer" className="btn btn-sm" data-magnetic>
              <FileText size={16} aria-hidden="true" /> Resume
            </a>
          </li>
        </ul>
        <button className="burger" aria-expanded={open} aria-controls="menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
    </header>
  )
}
