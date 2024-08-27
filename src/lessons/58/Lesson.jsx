import { Canvas } from "@react-three/fiber";
import "./lesson.css";
import Experience from "./Experience";
import { toneMapping } from "three/examples/jsm/nodes/Nodes.js";
import * as THREE from "three";

// const created = ({scene}) => {
//   scene.background = new THREE.Color("red");
// }

export default function Lesson() {
  return (
    <Canvas
    shadows
      // onCreated={created}
      style={{ backgroundColor: "cadetblue" }}
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
      <color attach="background" args={["#ccffcc"]} />
    </Canvas>
  );
}
