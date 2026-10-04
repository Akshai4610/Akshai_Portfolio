import { useRef } from 'react'
import { Github, ExternalLink } from 'lucide-react'
import usePerformanceTier from '../hooks/usePerformanceTier'

export default function ProjectCard({ project: p }) {
  const ref = useRef(null)
  const caps = usePerformanceTier()
  const tilt = caps.tier === 'high' && caps.finePointer

  const move = (e) => {
    if (!tilt) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 6}deg`)
    ref.current.style.setProperty('--rx', `${-((e.clientY - r.top) / r.height - 0.5) * 6}deg`)
  }
  const leave = () => { ref.current.style.setProperty('--ry', '0deg'); ref.current.style.setProperty('--rx', '0deg') }

  return (
    <article ref={ref} className={`card project ${tilt ? 'tilt' : ''}`} data-cursor="project" onPointerMove={move} onPointerLeave={leave}>
      <div className="project-visual">
        {p.image
          ? <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" decoding="async" />
          : <span aria-hidden="true">{p.title.charAt(0)}</span>}
      </div>
      <div className="project-body">
        <p className="period">{p.type}</p>
        <h4>{p.title}</h4>
        <p>{p.description}</p>
        <ul className="feature-list">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
        <ul className="chips" aria-label="Technologies used">{p.technologies.map((t) => <li key={t}>{t}</li>)}</ul>
        {(p.github || p.demo) && (
          <div className="cta-row">
            {p.github && <a className="btn btn-sm btn-ghost" href={p.github} target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true" /> GitHub</a>}
            {p.demo && <a className="btn btn-sm" href={p.demo} target="_blank" rel="noreferrer"><ExternalLink size={16} aria-hidden="true" /> Demo</a>}
          </div>
        )}
      </div>
    </article>
  )
}
