import { OrbitControls, MeshReflectorMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import Cube from "./Cube";
import { useControls, button } from "leva";
import { Perf } from "r3f-perf";

export default function Experience() {
  const groupRef = useRef();

  const sphereControls = useControls("sphere", {
    position: {
      value: {
        x: 0,
        y: 0,
      },
      joystick: "invertY",
      min: -4,
      max: 4,
      step: 0.1,
    },
  });
  const floorControl = useControls("floor", {
    color: "#ff0000",

  });
  const cubeControl = useControls("cube", {
    scale: {
      value: 1,
      min: 0.1,
      max: 2,
      step: 0.1,
    },
  });
  const otherControl = useControls("Misc", {
    performance: true,
    clickMe: button(() => {
      alert("click");
    }),
  });

  useFrame((state, delta) => {
    // const angle = state.clock.getElapsedTime();
    // state.camera.position.x = Math.sin(angle) * 8;
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {otherControl.performance && <Perf position="top-left" />}
      <OrbitControls makeDefault />
      {/* makeDefault remove the with TransformControls */}
      <directionalLight position={[1, 2, 3]} intensity={5} />
      <ambientLight intensity={1.5} />

      {/* <mesh>
                <torusKnotGeometry />
                <meshNormalMaterial />
            </mesh> */}
      <group ref={groupRef}>
        <mesh
          position={[sphereControls.position.x, sphereControls.position.y, 0]}
        >
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>

        <Cube scale={cubeControl.scale} />
      </group>
      <mesh position-y={-1} scale={10} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <MeshReflectorMaterial
          resolution={2048}
          blur={[1000, 1000]}
          mixBlur={0}
          mirror={0.8}
          color={floorControl.color}
        />
      </mesh>
    </>
  );
}
