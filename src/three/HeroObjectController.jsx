import { useLayoutEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MathUtils } from 'three'
import HeroObject from './HeroObject'
import { heroObjectStates, previewTiming } from './heroObjectStates'

function applyPose(object, state, opacity, offset, idle) {
  object.material.opacity = opacity
  object.scale.setScalar(0.88 + opacity * 0.12)
  object.position.y = offset * 0.1
  object.rotation.set(
    state.rotation[0],
    state.rotation[1] + idle + offset * 0.24,
    state.rotation[2],
  )
}

export default function HeroObjectController({ pointer, reducedMotion, active, states = heroObjectStates }) {
  const group = useRef()
  const objects = useRef([])
  const sequence = useRef({ index: 0, phase: 'hold', elapsed: 0, idle: 0 })
  const viewport = useThree((state) => state.viewport)
  const invalidate = useThree((state) => state.invalidate)
  const scale = Math.min(viewport.width, viewport.height) * 0.33

  useLayoutEffect(() => {
    if (!reducedMotion || states.length === 0) return

    // A preference change during a fade must leave a complete, static object visible.
    const current = sequence.current
    current.index = Math.min(current.index, states.length - 1)
    current.phase = 'hold'
    current.elapsed = 0
    objects.current.forEach((object, index) => {
      if (!object) return
      object.visible = index === current.index
      applyPose(object, states[index], 1, 0, current.idle)
    })
    invalidate()
  }, [reducedMotion, states, invalidate])

  useFrame((_, delta) => {
    if (reducedMotion || !active || states.length === 0) return

    const step = Math.min(delta, 0.05)
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, pointer.current.y * 0.12, 3, step)
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, pointer.current.x * 0.18, 3, step)

    const current = sequence.current
    current.idle += step * 0.055
    current.elapsed += Math.min(delta, 0.1)
    const duration = current.phase === 'hold' ? previewTiming.hold : previewTiming.fade

    if (states.length > 1 && current.elapsed >= duration) {
      current.elapsed = 0
      if (current.phase === 'hold') {
        current.phase = 'exit'
      } else if (current.phase === 'exit') {
        // Swap only at zero opacity: unrelated geometries never overlap or morph.
        objects.current[current.index].visible = false
        current.index = (current.index + 1) % states.length
        objects.current[current.index].visible = true
        current.phase = 'enter'
      } else {
        current.phase = 'hold'
      }
    }

    const progress = Math.min(current.elapsed / previewTiming.fade, 1)
    const eased = progress * progress * (3 - 2 * progress)
    const opacity = current.phase === 'exit' ? 1 - eased : current.phase === 'enter' ? eased : 1
    const offset = current.phase === 'exit' ? eased : current.phase === 'enter' ? eased - 1 : 0
    applyPose(objects.current[current.index], states[current.index], opacity, offset, current.idle)
  })

  return (
    <group ref={group} name="hero-object-controller" scale={scale}>
      {states.map((state, index) => (
        <HeroObject
          key={state.id}
          ref={(object) => { objects.current[index] = object }}
          state={state}
          visible={index === 0}
        />
      ))}
    </group>
  )
}
