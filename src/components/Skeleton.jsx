export default function Skeleton({ className = '', round = false, style }) {
  return <div className={`skeleton ${round ? 'skeleton-round' : ''} ${className}`} style={style} aria-hidden="true" />
}
