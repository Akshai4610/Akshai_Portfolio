import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { projects } from '../data/projects'
import useReducedMotion from '../hooks/useReducedMotion'
import ProjectCard from '../components/ProjectCard'

const projectsPerPage = 2
const OUT_MS = 200
const IN_MS = 240

// State lives here, so leaving the Projects tab unmounts it and the page resets to 1.
export default function ProjectsContent() {
  const [currentProjectPage, setCurrentProjectPage] = useState(1)
  const [phase, setPhase] = useState('') // '', 'out-next', 'out-prev', 'in-next', 'in-prev'
  const reduced = useReducedMotion()
  const busy = useRef(false)
  const timers = useRef([])
  const touch = useRef(null)

  const totalPages = Math.max(1, Math.ceil(projects.length / projectsPerPage))
  const start = (currentProjectPage - 1) * projectsPerPage
  const current = projects.slice(start, start + projectsPerPage)

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const go = (dir) => {
    const target = currentProjectPage + dir
    if (busy.current || target < 1 || target > totalPages) return
    if (reduced) { setCurrentProjectPage(target); return }
    const name = dir > 0 ? 'next' : 'prev'
    busy.current = true
    setPhase(`out-${name}`)
    timers.current.push(setTimeout(() => {
      setCurrentProjectPage(target)
      setPhase(`in-${name}`)
      timers.current.push(setTimeout(() => { setPhase(''); busy.current = false }, IN_MS))
    }, OUT_MS))
  }

  const onTouchStart = (e) => { const t = e.touches[0]; touch.current = { x: t.clientX, y: t.clientY } }
  const onTouchEnd = (e) => {
    if (!touch.current) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touch.current.x
    const dy = t.clientY - touch.current.y
    touch.current = null
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
  }

  return (
    <>
      <div className="projects-carousel" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} role="group" aria-roledescription="carousel" aria-label="Projects">
        <button type="button" className="project-arrow project-prev" aria-label="Previous projects" disabled={currentProjectPage === 1} onClick={() => go(-1)}>
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <div className="projects-viewport">
          <div className={`projects-track ${phase}`}>
            {current.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        </div>
        <button type="button" className="project-arrow project-next" aria-label="Next projects" disabled={currentProjectPage === totalPages} onClick={() => go(1)}>
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
      <p className="project-pagination" aria-live="polite" aria-label={`Page ${currentProjectPage} of ${totalPages}`}>
        {currentProjectPage} / {totalPages}
      </p>
    </>
  )
}
