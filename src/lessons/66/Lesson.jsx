import { Canvas } from "@react-three/fiber";
import "./lesson.css";
import Experience from "./Experience";
import { toneMapping } from "three/examples/jsm/nodes/Nodes.js";
import * as THREE from "three";
import { KeyboardControls } from "@react-three/drei";
import Interface from "./Interface";

export default function Lesson() {
  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      <div className="lesson">
        <Canvas
          shadows
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [2.5, 4, 6],
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
      <Interface />
      </div>
    </KeyboardControls>
  );
}
