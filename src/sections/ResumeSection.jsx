import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTabs from '../components/SectionTabs'
import AboutContent from '../content/AboutContent'
import EducationContent from '../content/EducationContent'
import SkillsContent from '../content/SkillsContent'
import ProjectsContent from '../content/ProjectsContent'
import CertificationsContent from '../content/CertificationsContent'

const tabs = [
  { id: 'about', label: 'About', Content: AboutContent },
  { id: 'education', label: 'Education', Content: EducationContent },
  { id: 'skills', label: 'Skills', Content: SkillsContent },
  { id: 'projects', label: 'Projects', Content: ProjectsContent },
  { id: 'certifications', label: 'Certifications', Content: CertificationsContent },
]

export default function ResumeSection() {
  const [activeTab, setActiveTab] = useState('about')
  const { Content } = tabs.find((t) => t.id === activeTab)

  // Tab height changes move the Contact section; recompute scroll trigger positions
  useEffect(() => { ScrollTrigger.refresh() }, [activeTab])

  return (
    <section id="about" className="section" aria-labelledby="resume-h">
      <div className="container">
        <p className="eyebrow" data-reveal>About</p>
        <h2 id="resume-h" className="sr-only">About and resume</h2>
        <SectionTabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        <div key={activeTab} id="resume-panel" className="panel" role="tabpanel" aria-labelledby={`tab-${activeTab}`} tabIndex={0}>
          <Content />
        </div>
      </div>
    </section>
  )
}
