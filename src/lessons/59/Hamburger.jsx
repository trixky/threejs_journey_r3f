/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

const modelUrl = import.meta.env.BASE_URL + "/pu59/hamburger-draco.glb";

const positionYshift = 2;

export default function Hamburger(props) {
  const { nodes, materials } = useGLTF(modelUrl);
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.bottomBun.geometry}>
        <meshStandardMaterial attach="material" color="#ff99ee" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.meat.geometry}
        position={[0, 2.817 + positionYshift * 1, 0]}
      >
        <meshStandardMaterial attach="material" color="red" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cheese.geometry}
        position={[0, 3.04 + positionYshift * 2, 0]}
      >
        <meshStandardMaterial attach="material" color="blue" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.topBun.geometry}
        position={[0, 1.771 + positionYshift * 3, 0]}
      >
        <meshStandardMaterial attach="material" color="#ff99ee" />
      </mesh>
    </group>
  );
}

useGLTF.preload(modelUrl);
