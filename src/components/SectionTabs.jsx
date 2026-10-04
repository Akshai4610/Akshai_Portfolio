import { useEffect, useRef } from 'react'

export default function SectionTabs({ tabs, active, onChange }) {
  const list = useRef(null)

  // Keep the active tab visible when the bar scrolls horizontally on small screens
  useEffect(() => {
    list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ inline: 'center', block: 'nearest' })
  }, [active])

  const onKeyDown = (e) => {
    const i = tabs.findIndex((t) => t.id === active)
    const next = { ArrowRight: (i + 1) % tabs.length, ArrowLeft: (i - 1 + tabs.length) % tabs.length, Home: 0, End: tabs.length - 1 }[e.key]
    if (next === undefined) return
    e.preventDefault()
    onChange(tabs[next].id)
    document.getElementById(`tab-${tabs[next].id}`)?.focus()
  }

  return (
    <div className="tabs-wrap">
      <div ref={list} className="tabs" role="tablist" aria-label="Resume sections" onKeyDown={onKeyDown}>
        {tabs.map((t) => (
          <button
            key={t.id} type="button" role="tab" id={`tab-${t.id}`}
            aria-selected={active === t.id} aria-controls="resume-panel"
            tabIndex={active === t.id ? 0 : -1}
            className={`tab ${active === t.id ? 'is-active' : ''}`}
            onClick={() => onChange(t.id)}
          >{t.label}</button>
        ))}
      </div>
    </div>
  )
}
