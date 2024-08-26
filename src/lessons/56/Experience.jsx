import {
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import CustomObject from "./CustomObject";
import * as THREE from "three";

export default function Experience() {
  const groupRef = useRef();
  const cubeRef = useRef();
  const sphereRef = useRef();

  useFrame((state, delta) => {
    // const angle = state.clock.getElapsedTime();
    // state.camera.position.x = Math.sin(angle) * 8;
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <OrbitControls makeDefault />
      {/* makeDefault remove the with TransformControls */}
      <directionalLight position={[1, 2, 3]} intensity={5} />
      <ambientLight intensity={1.5} />

      {/* <mesh>
                <torusKnotGeometry />
                <meshNormalMaterial />
            </mesh> */}
      <group ref={groupRef}>
        <PivotControls
          anchor={[0, 0, 0]}
          depthTest={false}
          lineWidth={2}
          axisColors={["red", "green", "blue"]}
          scale={100} // pixel if fixed
          fixed
        >
          <mesh position-x={-2} ref={sphereRef}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
            <Html
              position={[0, 1.5, 0]}
              wrapperClass="label"
              center
              distanceFactor={8}
              occlude={[cubeRef, sphereRef]}
            >
              Sphere
            </Html>
          </mesh>
        </PivotControls>
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
        <TransformControls object={cubeRef} mode="translate" />
        {/* scale / rotation mode */}
      </group>
      <mesh position-y={-1} scale={10} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <MeshReflectorMaterial resolution={64}  blur={[1000, 1000]} mixBlur={0} mirror={1} />
        {/* <meshStandardMaterial color="greenyellow" /> */}
      </mesh>
      <CustomObject />
      <Float speed={1} floatIntensity={1}>
        <Text
          font="./bangers-v20-latin-regular.woff"
          fontSize={1}
          position={[0, 2, 0]}
          maxWidth={10}
          textAlign="center"
        >
          R3F
          <meshNormalMaterial side={THREE.DoubleSide} />
        </Text>
      </Float>
    </>
  );
}
