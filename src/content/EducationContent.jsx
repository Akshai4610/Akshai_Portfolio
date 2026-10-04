import { GraduationCap } from 'lucide-react'
import { education } from '../data/portfolio'

export default function EducationContent() {
  return (
    <ol className="timeline">
      <li className="tl-line" aria-hidden="true" />
      {education.map((e) => (
        <li key={e.degree} className={`tl-item ${e.featured ? 'featured' : ''}`}>
          <span className="tl-dot" aria-hidden="true" />
          <div className="card">
            <p className="period">{e.period}</p>
            <h4>{e.featured && <GraduationCap size={22} aria-hidden="true" />} {e.degree}</h4>
            <p>{e.institution}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
