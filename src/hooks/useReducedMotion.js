import useMediaQuery from './useMediaQuery'

export default function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
