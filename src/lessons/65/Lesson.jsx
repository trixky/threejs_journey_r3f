import { Canvas } from "@react-three/fiber";
import "./lesson.css";
import Experience from "./Experience";
import { toneMapping } from "three/examples/jsm/nodes/Nodes.js";
import * as THREE from "three";

export default function Lesson() {
  return (
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [4, 2, 6],
      }}
      style={{ backgroundColor: "lightskyblue" }}
      gl={{
        antialias: true,
        toneMapping: toneMapping.ACESFilmicToneMapping,
        // toneMapping: THREE.CineonToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
        alpha: true, // default
      }}
    >
      <Experience />
    </Canvas>
  );
}
