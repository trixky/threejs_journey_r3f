import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls, useGLTF, meshBounds } from "@react-three/drei";

export default function Experience() {
  const cube = useRef();
  const hamburger = useGLTF(import.meta.env.BASE_URL + "/pu59/hamburger.glb");

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  function handleCubeMove(event) {
    // event.stopPropagation();
    console.log("handleCubeMove");
    cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 50%)`);
  }

  function handlePreventRaycast(event) {
    event.stopPropagation();
  }

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh position-x={-2} onPointerMove={handlePreventRaycast}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        ref={cube}
        // raycast={meshBounds} // Sphere bounds optimization
        position-x={2}
        scale={1.5}
        onPointerMove={handleCubeMove}
        onPointerEnter={() => (document.body.style.cursor = "pointer")}
        onPointerLeave={() => (document.body.style.cursor = "auto")}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      {/* onPointerOver={} */}
      {/* onPointerEnter={} */}
      {/* onPointerLeave={} */}
      {/* onPointerMove={} */}
      {/* onPointerMissed={} */}
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <primitive
        object={hamburger.scene}
        scale={0.2}
        position-y={1}
        onClick={(event) => {
          // console.log(event.objectEvent);
          // console.log(event.object);
          console.log(event.object.name);
          event.stopPropagation();
        }}
      />
    </>
  );
}
