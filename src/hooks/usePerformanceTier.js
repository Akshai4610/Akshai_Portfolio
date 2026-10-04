import { useEffect } from 'react'
import { detectCapabilities } from '../utils/performance'

export default function usePerformanceTier() {
  const caps = detectCapabilities()
  useEffect(() => {
    document.documentElement.dataset.tier = caps.tier
  }, [caps.tier])
  return caps
}
