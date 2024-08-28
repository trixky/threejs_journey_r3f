import {
  Center,
  OrbitControls,
  useGLTF,
  useTexture,
  Sparkles,
  shaderMaterial,
} from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import portalVertexShader from "../../../public/blender/portal/vertex.glsl";
import portalFragmentShader from "../../../public/blender/portal/fragment.glsl";
import { useRef } from "react";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#ffa44f"),
    uColorEnd: new THREE.Color("#fffa91"),
  },
  portalVertexShader,
  portalFragmentShader
);

extend({ PortalMaterial });

export default function Experience() {
  const { nodes } = useGLTF(import.meta.env.BASE_URL + "/blender/portal_2.glb");

  const bakedTexture = useTexture(
    import.meta.env.BASE_URL + "/blender/baked_result_2.jpg"
  );
  bakedTexture.flipY = false;

  const portalMaterial = useRef();

  useFrame((state, delta) => {
    portalMaterial.current.uTime += delta;
  });

  return (
    <>
      <color attach="background" args={["#201919"]} />

      <OrbitControls makeDefault />

      <Center>
        {/* ----------------------- MODEL */}
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        {/* ----------------------- POLE LIGHTS */}
        <mesh
          geometry={nodes.poleLigneA.geometry}
          position={nodes.poleLigneA.position}
        >
          <meshBasicMaterial color="#73f6ff" />
        </mesh>
        <mesh
          geometry={nodes.poleLigneB.geometry}
          position={nodes.poleLigneB.position}
        >
          <meshBasicMaterial color="#73f6ff" />
        </mesh>
        {/* ----------------------- PORTAL */}
        <mesh geometry={nodes.portal.geometry} position={nodes.portal.position}>
          <portalMaterial ref={portalMaterial} />
          {/* <shaderMaterial
            side={THREE.DoubleSide}
            vertexShader={portalVertexShader}
            fragmentShader={portalFragmentShader}
            uniforms={{
              uTime: { value: 0 },
              uColorStart: { value: new THREE.Color("#ff0000") },
              uColorEnd: { value: new THREE.Color("#0000ff") },
            }}
          /> */}
          {/* <meshBasicMaterial color="#fffa91" side={THREE.DoubleSide} /> */}
        </mesh>
        {/* ----------------------- SPARKLES */}
        <Sparkles
          size={3}
          scale={[4, 2, 4]}
          position-y={1}
          speed={0.2}
          count={50}
        />
      </Center>
    </>
  );
}
