import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { sceneConfig } from '../utils/performance'

// Shared, reused geometries (created once)
const icoGeo = new THREE.IcosahedronGeometry(2, 1)
const torusGeo = new THREE.TorusGeometry(2.6, 0.012, 6, 64)
const wireMat = new THREE.MeshBasicMaterial({ color: '#7c9cff', wireframe: true, transparent: true, opacity: 0.35 })
const ringMat = new THREE.MeshBasicMaterial({ color: '#5eead4', transparent: true, opacity: 0.6 })

function Scene({ count }) {
  const group = useRef()
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const m = (e) => { pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1; pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1 }
    window.addEventListener('pointermove', m, { passive: true })
    return () => window.removeEventListener('pointermove', m)
  }, [])

  const positions = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2.4 + Math.random() * 1.4, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1)
      a[i * 3] = r * Math.sin(ph) * Math.cos(th)
      a[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th)
      a[i * 3 + 2] = r * Math.cos(ph)
    }
    return a
  }, [count])

  useFrame((_, dt) => {
    const g = group.current
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.5)
    g.rotation.y += dt * 0.12
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, pointer.current.y * 0.35 + scroll * 0.6, 0.05)
    g.position.x = THREE.MathUtils.lerp(g.position.x, pointer.current.x * 0.25, 0.05)
  })

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh geometry={icoGeo} material={wireMat} />
        <mesh geometry={torusGeo} material={ringMat} rotation={[Math.PI / 2.4, 0, 0]} />
      </Float>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.035} color="#c7d2fe" sizeAttenuation transparent opacity={0.8} depthWrite={false} />
      </points>
    </group>
  )
}

export default function Hero3D({ tier, mobile }) {
  const wrap = useRef(null)
  const [visible, setVisible] = useState(true)
  const cfg = sceneConfig[tier] || sceneConfig.medium
  const count = mobile ? Math.round(cfg.particles / 2) : cfg.particles

  // Pause rendering when off-screen or tab hidden
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 })
    io.observe(wrap.current)
    const vis = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', vis)
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', vis) }
  }, [])

  return (
    <div ref={wrap} className="canvas-wrap" aria-hidden="true">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, cfg.maxDpr]}
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ antialias: cfg.antialias, powerPreference: 'high-performance', alpha: true }}
      >
        <Scene count={count} />
      </Canvas>
    </div>
  )
}
