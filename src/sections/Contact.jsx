import { useState } from 'react'
import { Mail, Phone, Linkedin, Github, MapPin, Send } from 'lucide-react'
import { profile } from '../data/portfolio'

export default function Contact() {
  const [note, setNote] = useState('')

  // No backend: opens the visitor's email client with the message prefilled.
  const submit = (e) => {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const subject = encodeURIComponent(`Portfolio enquiry from ${d.get('name')}`)
    const body = encodeURIComponent(`${d.get('message')}\n\nFrom: ${d.get('name')} (${d.get('email')})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setNote('Your email app should open with the message ready to send.')
  }

  const items = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
    { icon: Linkedin, label: 'linkedin.com/in/akshai4610', href: profile.linkedin },
    { icon: Github, label: 'github.com/akshai4610', href: profile.github },
    { icon: MapPin, label: profile.location },
  ]

  return (
    <section id="contact" className="section" aria-labelledby="contact-h">
      <div className="container contact-grid">
        <div>
          <p className="eyebrow" data-reveal>Contact</p>
          <h2 id="contact-h" data-reveal>Let&apos;s work together</h2>
          <p className="lead" data-reveal>I am looking for a Software Trainee role and would love to hear from you.</p>
          <ul className="contact-list" data-stagger>
            {items.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <Icon size={20} aria-hidden="true" />
                {href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{label}</a> : <span>{label}</span>}
              </li>
            ))}
          </ul>
        </div>
        <form className="card form" onSubmit={submit} data-reveal>
          <label>Name<input name="name" type="text" required autoComplete="name" /></label>
          <label>Email<input name="email" type="email" required autoComplete="email" /></label>
          <label>Message<textarea name="message" rows="5" required /></label>
          <button className="btn" type="submit" data-magnetic><Send size={18} aria-hidden="true" /> Send</button>
          <p className="form-note" role="status">{note}</p>
        </form>
      </div>
    </section>
  )
}
