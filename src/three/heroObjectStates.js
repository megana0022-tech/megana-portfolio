export const previewTiming = {
  hold: 2.8,
  fade: 0.85,
}

// Keep each form near one unit in radius so the controller can frame it consistently.
export const heroObjectStates = [
  {
    id: 'torus',
    geometry: 'torusGeometry',
    args: [0.8, 0.26, 24, 64],
    rotation: [0.25, 0.35, -0.25],
    material: { color: '#a97142', metalness: 0.78, roughness: 0.3 },
  },
  {
    id: 'sphere',
    geometry: 'sphereGeometry',
    args: [0.94, 40, 24],
    rotation: [0, 0, 0],
    material: { color: '#393536', metalness: 0.72, roughness: 0.28 },
  },
  {
    id: 'icosahedron',
    geometry: 'icosahedronGeometry',
    args: [1.05, 0],
    rotation: [0.2, 0.3, 0.1],
    material: { color: '#4a1124', metalness: 0.65, roughness: 0.34, flatShading: true },
  },
  {
    id: 'sculpture',
    geometry: 'torusKnotGeometry',
    args: [0.62, 0.2, 96, 12, 2, 3],
    rotation: [0.3, 0.15, -0.2],
    material: { color: '#746354', metalness: 0.8, roughness: 0.32 },
  },
]
