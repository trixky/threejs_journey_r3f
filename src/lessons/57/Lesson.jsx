import { Canvas } from "@react-three/fiber";
import "./lesson.css";
import Experience from "./Experience";
import { toneMapping } from "three/examples/jsm/nodes/Nodes.js";
import * as THREE from "three";
import { Leva, useControls } from "leva";

export default function Lesson() {
  return (
    <>
      <Leva />
      {/* <Leva collapsed /> */}
      <Canvas
        style={{ backgroundColor: "lightskyblue" }}
        dpr={[1, 2]} // limit to 2 (default)
        // flat // tone mapping to linear
        className="scene"
        //   orthographic
        camera={{
          fov: 45,
          // zoom: 100,
          near: 0.1,
          far: 200,
          position: [3, 2, 6],
        }}
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
    </>
  );
}
