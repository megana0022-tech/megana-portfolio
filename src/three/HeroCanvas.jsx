import { useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import useReducedMotion from '../hooks/useReducedMotion'
import HeroObjectController from './HeroObjectController'
import Lighting from './Lighting'

function ContextGuard({ onLost }) {
  const gl = useThree((state) => state.gl)

  useEffect(() => {
    const canvas = gl.domElement
    const handleLoss = (event) => {
      event.preventDefault()
      onLost(true)
    }
    canvas.addEventListener('webglcontextlost', handleLoss)
    return () => canvas.removeEventListener('webglcontextlost', handleLoss)
  }, [gl, onLost])

  return null
}

export default function HeroCanvas() {
  const container = useRef()
  const pointer = useRef({ x: 0, y: 0 })
  const reducedMotion = useReducedMotion()
  const [active, setActive] = useState(false)
  const [contextLost, setContextLost] = useState(false)

  useEffect(() => {
    const element = container.current
    const hero = element.closest('section')
    let inView = false

    const updateActivity = () => setActive(inView && !document.hidden)
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      updateActivity()
    })
    observer.observe(element)
    document.addEventListener('visibilitychange', updateActivity)

    // Listen on the hero, leaving the canvas transparent to clicks and touch scrolling.
    const resetPointer = () => {
      pointer.current.x = 0
      pointer.current.y = 0
    }
    const movePointer = (event) => {
      if (reducedMotion || event.pointerType === 'touch') return
      const bounds = hero.getBoundingClientRect()
      pointer.current.x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1))
      pointer.current.y = Math.max(-1, Math.min(1, 1 - ((event.clientY - bounds.top) / bounds.height) * 2))
    }
    hero.addEventListener('pointermove', movePointer, { passive: true })
    hero.addEventListener('pointerleave', resetPointer)
    resetPointer()

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', updateActivity)
      hero.removeEventListener('pointermove', movePointer)
      hero.removeEventListener('pointerleave', resetPointer)
    }
  }, [reducedMotion])

  return (
    <div ref={container} className="hero-canvas">
      {!contextLost && (
        <Canvas
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
          frameloop={active && !reducedMotion ? 'always' : 'demand'}
          fallback={<span />}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} near={0.1} far={30} />
          <Lighting />
          <HeroObjectController pointer={pointer} reducedMotion={reducedMotion} active={active} />
          <ContextGuard onLost={setContextLost} />
        </Canvas>
      )}
    </div>
  )
}
