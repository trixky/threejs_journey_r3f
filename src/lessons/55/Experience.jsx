import { useFrame, useThree, extend } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import CustomObject from "./CustomObject";

extend({ OrbitControls });

export default function Experience() {
  const { camera, gl } = useThree();

  const groupRef = useRef();
  const cubeRef = useRef();

  useFrame((state, delta) => {
    // const angle = state.clock.getElapsedTime();
    // state.camera.position.x = Math.sin(angle) * 8;
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0, 0, 0);

    cubeRef.current.rotation.y += delta;
    groupRef.current.rotation.y += delta / 4;
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]}/>
      <directionalLight position={[1, 2, 3]} intensity={5} />
      <ambientLight intensity={1.5} />

      {/* <mesh>
                <torusKnotGeometry />
                <meshNormalMaterial />
            </mesh> */}
      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh
          ref={cubeRef}
          scale={1.5}
          position={[2, 0, 0]}
          rotation-y={Math.PI / 4}
        >
          {/* scale={[3, 2, 1]}> */}
          {/* position-x={3} */}
          <boxGeometry scale={1.5} />
          <meshStandardMaterial color="mediumpurple" wireframe={false} />
          {/* <meshStandardMaterial args={[{ color: "red" }]} /> */}
        </mesh>
      </group>
      <mesh position-y={-1} scale={10} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      <CustomObject />
    </>
  );
}
