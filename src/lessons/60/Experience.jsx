import {
  useMatcapTexture,
  OrbitControls,
  Text3D,
  Center,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const torusGeometry = new THREE.TorusGeometry(1, 0.4, 32, 100);
const torusMaterial = new THREE.MeshMatcapMaterial();

export default function Experience() {
  // const [torusGeometry, setTorusGeometry] = useState();
  // const [torusMaterial, setTorusMaterial] = useState();

  // const torusGroupRef = useRef();

  const donuts = useRef([]);

  const [matcapTexture] = useMatcapTexture("71623B_ECDE8C_30250A_ABA69A", 256);
  const [matcapTorusTexture] = useMatcapTexture(
    "6EC66E_C9F8C9_A3E8A3_B4F1B4",
    256
  );

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    // ^^^ because native threejs and drei use different color spaces
    torusMaterial.needsUpdate = true;
    torusMaterial.matcap = matcapTorusTexture;
    torusMaterial.needsUpdate = true;
  }, []);

  useFrame((scene, delta) => {
    // for (const child of torusGroupRef.current.children) {
    //   child.rotation.x += delta * 0.2;
    //   child.rotation.y += delta * 0.2;
    // }

    for (const donut of donuts.current) {
      donut.rotation.x += delta * 0.2;
      donut.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* <torusGeometry ref={setTorusGeometry} args={[1, 0.4, 32, 100]} />
      <meshMatcapMaterial ref={setTorusMaterial} matcap={matcapTorusTexture} /> */}

      <mesh position-y={-1.5}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>

      {/* <group ref={torusGroupRef}> */}
        {new Array(300).fill().map((_, index) => (
          <mesh
          key={index}
          ref={(element) => donuts.current[index] = element}
            position={[
              Math.random() * 30 - 15,
              Math.random() * 30 - 15,
              Math.random() * 30 - 15,
            ]}
            rotation={[
              Math.random() * Math.PI,
              Math.random() * Math.PI,
              Math.random() * Math.PI,
            ]}
            scale={Math.random() / 2 + 0.5}
            geometry={torusGeometry}
            material={torusMaterial}
          />
        ))}
      {/* </group> */}

      <Center>
        <Text3D
          font={
            import.meta.env.BASE_URL + "/pu60/helvetiker_regular.typeface.json"
          }
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          yolo
          <meshMatcapMaterial matcap={matcapTexture} />
        </Text3D>
      </Center>
    </>
  );
}
