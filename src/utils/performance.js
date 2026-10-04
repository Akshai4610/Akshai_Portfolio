function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}

let cached
export function detectCapabilities() {
  if (cached) return cached
  const mq = (q) => window.matchMedia(q).matches
  const nav = navigator
  const reduced = mq('(prefers-reduced-motion: reduce)')
  const coarse = mq('(pointer: coarse)')
  const finePointer = mq('(hover: hover) and (pointer: fine)')
  const mobile = window.innerWidth < 768 || (coarse && window.innerWidth < 1024)
  const cores = nav.hardwareConcurrency || 4
  const memory = nav.deviceMemory ?? 8
  const dpr = window.devicePixelRatio || 1
  const conn = nav.connection || {}
  const slowNet = !!conn.saveData || /(^|-)2g$/.test(conn.effectiveType || '')
  const webgl = hasWebGL()

  let tier = 'medium'
  if (reduced || !webgl || slowNet || cores <= 2 || memory <= 2) tier = 'low'
  else if (!mobile && !coarse && cores >= 8 && memory >= 8) tier = 'high'

  cached = { tier, reduced, mobile, coarse, finePointer, webgl, cores, memory, dpr }
  return cached
}

// 3D settings per tier
export const sceneConfig = {
  high: { particles: 320, maxDpr: 1.75, antialias: true },
  medium: { particles: 110, maxDpr: 1.25, antialias: false },
}
