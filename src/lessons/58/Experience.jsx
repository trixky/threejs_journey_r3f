import {
  OrbitControls,
  MeshReflectorMaterial,
  useHelper,
  BakeShadows,
  RandomizedLight,
  AccumulativeShadows,
  ContactShadows,
  Sky,
  Environment,
  Lightformer,
  // SoftShadows
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useControls } from "leva";

const shadowCameraSize = 2.5;

export default function Experience() {
  const directionalLightRef = useRef();
  const cubeRef = useRef();

  // useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);
  // remove (artifact)

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta / 4;
    // cubeRef.current.position.x = Math.sin(state.clock.getElapsedTime()) * 1 + 1.5;
    // const angle = state.clock.getElapsedTime();
    // state.camera.position.x = Math.sin(angle) * 8;
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0, 0, 0);
  });

  const { color, opacity, blur } = useControls("contact shadows", {
    color: "#316d39",
    opacity: { value: 0.8, min: 0, max: 1 },
    blur: { value: 0.5, min: 0, max: 1 },
  });

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
    useControls("environment map", {
      envMapIntensity: { value: 3, min: 0, max: 12 },
      envMapHeight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 28, min: 10, max: 1000 },
      envMapScale: { value: 100, min: 10, max: 1000 },
    });

  const scene = useThree((state) => state.scene);
  useEffect(() => {
    scene.environmentIntensity = envMapIntensity;
  }, [envMapIntensity]);

  const { sunPosition } = useControls("sun", {
    sunPosition: { value: [1, 2, 3], step: 0.1 },
  });

  return (
    <>
      {/* <BakeShadows /> */}
      {/* <SoftShadows size={ 25 } samples={ 10 } focus={ 0 } /> */}
      <Environment
        background
        preset="sunset"
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
      >
        <Lightformer
          position-y={5}
          intensity={10}
          scale={10}
          color="#ff0000"
          form="ring"
          rotation={[Math.PI / 2, 0, 0]}
        />
        <color attach="background" args={["#000000"]} />
        {/* <mesh position={[0, 0, -5]} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={[3, 0, 0]} />
        </mesh> */}
      </Environment>

      <Perf position="top-left" />
      {/* <Sky sunPosition={sunPosition} /> */}
      <OrbitControls makeDefault />
      <ContactShadows
        position={[0, -0.98, 0]}
        resolution={512}
        far={5}
        color={color}
        opacity={opacity}
        blur={blur}
        // frames={1} // Static
      />
      <AccumulativeShadows
        position={[0, 0.01, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        frames={1000}
        // frames={Infinity}
        // blend={100}
        temporal
      >
        <RandomizedLight
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={3}
          position={[1, 2, 3]}
          bias={0.001}
        />
      </AccumulativeShadows>
      {/* <directionalLight
        // castShadow
        shadow-mapSize={[1024, 1024]}
        position={sunPosition}
        intensity={5}
        ref={directionalLightRef}
        shadow-camera-near={1}
        shadow-camera-far={8}
        shadow-camera-top={shadowCameraSize}
        shadow-camera-right={shadowCameraSize}
        shadow-camera-left={-shadowCameraSize}
        shadow-camera-bottom={-shadowCameraSize}
      />
      <ambientLight intensity={1.5} /> */}

      {/* <mesh>
                <torusKnotGeometry />
                <meshNormalMaterial />
            </mesh> */}
      <group>
        <mesh castShadow position-x={-2} position-y={1}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh
          castShadow
          scale={1.5}
          position={[2, 1, 0]}
          rotation-y={Math.PI / 4}
          ref={cubeRef}
        >
          {/* scale={[3, 2, 1]}> */}
          {/* position-x={3} */}
          <boxGeometry scale={1.5} />
          <meshStandardMaterial color="mediumpurple" wireframe={false} />
          {/* <meshStandardMaterial args={[{ color: "red" }]} /> */}
        </mesh>
        {/* scale / rotation mode */}
      </group>
      <mesh receiveShadow position-y={0} scale={10} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <meshStandardMaterial color="lightblue" />
        {/* <MeshReflectorMaterial
          resolution={1024}
          blur={[1000, 1000]}
          mixBlur={0}
          mirror={0.5}
          color="blue"
        /> */}
        {/* <meshStandardMaterial color="greenyellow" /> */}
      </mesh>
    </>
  );
}
