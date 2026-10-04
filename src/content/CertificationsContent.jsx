import { Award } from 'lucide-react'
import { certifications } from '../data/portfolio'

export default function CertificationsContent() {
  return (
    <div className="grid-3">
      {certifications.map((c) => (
        <article key={c.name} className="card">
          <div className="icon-badge"><Award size={22} aria-hidden="true" /></div>
          <h4>{c.name}</h4>
          <p>{c.org}</p>
          <p className="period">{c.date}</p>
          {c.link && <a href={c.link} target="_blank" rel="noreferrer" className="link">View credential</a>}
        </article>
      ))}
    </div>
  )
}
