import { Code2, Layout, Server, Wrench, Users, Languages, Brain } from 'lucide-react'
import { skills } from '../data/portfolio'

const icons = { code: Code2, layout: Layout, server: Server, wrench: Wrench, users: Users, languages: Languages, brain: Brain }

export default function SkillsContent() {
  return (
    <div className="grid-3">
      {skills.map((s) => {
        const Icon = icons[s.icon] || Code2
        return (
          <article key={s.group} className="card skill-card">
            <div className="icon-badge"><Icon size={22} aria-hidden="true" /></div>
            <h4>{s.group}</h4>
            <ul className="chips">{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
          </article>
        )
      })}
    </div>
  )
}
