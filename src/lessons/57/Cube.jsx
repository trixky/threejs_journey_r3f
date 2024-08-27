export default function Cube({scale = 1}) {
  return (
    <mesh scale={scale} position={[2, 0, 0]} rotation-y={Math.PI / 4}>
      <boxGeometry />
      <meshStandardMaterial color="mediumpurple" wireframe={false} />
    </mesh>
  );
}
