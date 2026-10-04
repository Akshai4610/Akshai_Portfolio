import { Download, FileText } from 'lucide-react'
import { about, profile } from '../data/portfolio'

export default function AboutContent() {
  return (
    <>
      <h3 className="panel-title">A strong academic foundation, ready to <span className="grad">start building</span>.</h3>
      <p className="lead">{about.summary}</p>
      <div className="grid-4">
        {about.cards.map((c) => (
          <article key={c.title} className="card"><h4>{c.title}</h4><p>{c.text}</p></article>
        ))}
      </div>
      <div className="cta-box">
        <div className="cta-bg" aria-hidden="true" />
        <h3 className="panel-title">Want to know more about my background?</h3>
        <p className="lead">View my complete resume.</p>
        <div className="cta-row center">
          <a href={profile.resume} target="_blank" rel="noreferrer" className="btn"><FileText size={18} aria-hidden="true" /> View Resume</a>
          <a href={profile.resume} download="Akshai_P_R_Resume.pdf" className="btn btn-ghost"><Download size={18} aria-hidden="true" /> Download Resume</a>
        </div>
      </div>
    </>
  )
}
