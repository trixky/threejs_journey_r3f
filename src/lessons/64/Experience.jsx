import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  ContactShadows,
  Environment,
  Float,
  OrbitControls,
  PresentationControls,
  useGLTF,
  Html,
  Text,
} from "@react-three/drei";

export default function Experience() {
  const computer = useGLTF(
    "https://threejs-journey.com/resources/models/macbook_model.gltf"
  );

  return (
    <>
      <Environment preset="city" />
      <color attach="background" args={["#241a1a"]} />
      {/* <OrbitControls makeDefault /> */}

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={"#ff6900"}
            rotation={[0.1, Math.PI, 0]}
            position={[0, 0.55, -1.55]}
          />
          <primitive object={computer.scene} position-y={-1.2}>
            <Html
              transform
              wrapperClass="htmlScreen"
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              <iframe src="https://bruno-simon.com/html/" />
            </Html>
          </primitive>
          <Text
            font={import.meta.env.BASE_URL + "/bangers-v20-latin-regular.woff"}
            fontSize={0.5}
            position={[-3, 0.75, 0]}
            rotation-y={0.5}
            children={"Bruno\rSimon"}
          >
            R3F Journey
          </Text>
        </Float>
      </PresentationControls>
      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}
