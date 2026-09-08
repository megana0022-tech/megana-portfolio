export default function Lighting() {
  return (
    <>
      <hemisphereLight args={['#f5f2eb', '#4a1124', 1.1]} />
      <directionalLight position={[3, 4, 5]} color="#f5f2eb" intensity={3} />
      <directionalLight position={[-4, 1, -2]} color="#a97142" intensity={2} />
    </>
  )
}
