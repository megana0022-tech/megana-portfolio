export default function HeroObject({ ref, state, visible }) {
  const Geometry = state.geometry

  // Future model renderers can replace this mesh while keeping the controller's pose contract.
  return (
    <mesh ref={ref} name={state.id} visible={visible} rotation={state.rotation}>
      <Geometry args={state.args} />
      <meshStandardMaterial {...state.material} transparent />
    </mesh>
  )
}
