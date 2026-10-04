import { Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-name">{profile.name}</p>
          <p>{profile.title} · {profile.role}</p>
        </div>
        <ul className="social" aria-label="Footer links">
          <li><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><Linkedin size={18} /></a></li>
          <li><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github size={18} /></a></li>
          <li><a href={`mailto:${profile.email}`} aria-label="Send an email"><Mail size={18} /></a></li>
        </ul>
        <p className="copy">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
      </div>
      <div className="footer-glow" aria-hidden="true" />
    </footer>
  )
}
