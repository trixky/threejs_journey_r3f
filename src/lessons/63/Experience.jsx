import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  EffectComposer,
  ToneMapping,
  Vignette,
  Glitch,
  Noise,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { GlitchMode, BlendFunction } from "postprocessing";
import Drunk from "./Drunk";
import { useRef } from "react";
import { useControls } from "leva";

export default function Experience() {
  const drunkRef = useRef();

  const drunkProps = useControls("Drunk", {
    frequency: { value: 2, min: 1, max: 20 },
    amplitude: { value: 0.1, min: 0, max: 1 },
  });

  return (
    <>
      <color attach="background" args={["#000000"]} />
      {/* multisampling = 0 is for remove anti aliasing, default is 8 */}
      <EffectComposer multisampling={0}>
        <Drunk ref={drunkRef} {...drunkProps} blendFunction={BlendFunction.DARKEN} />
        {/* <ToneMapping mode={ToneMappingMode.ACES_FILMIC} /> */}
        {/* <Vignette offset={0.3} darkness={0.9}
        blendFunction={BlendFunction.COLOR_BURN}
        /> */}
        <Glitch
          delay={[0.5, 1]}
          duration={0.3}
          strength={3}
          // mode={GlitchMode.CONSTANT_MILD}
        />
        <Noise
          // premultiply
          blendFunction={BlendFunction.SOFT_LIGHT}
        />
        <Bloom luminanceThreshold={1.1} />
        {/* <Bloom mipmapBlur luminanceThreshold={1} intensity={0.3}/> */}
        {/* <DepthOfField focusDistance={0.025} focalLength={0.025} bokehScale={6} /> */}
      </EffectComposer>
      {/* EffectComposer remove tone mapping for start with linear */}
      {/* Because R3F use tone mapping by default */}
      <Perf position="top-left" />
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh position-x={-2} castShadow>
        <sphereGeometry />
        {/* emissive is working more on the light face with standard material */}
        {/* <meshStandardMaterial color="white" emissive="red" emissiveIntensity={10} toneMapped={false} /> */}
        {/* use basic material for doesn't care of external light */}
        <meshBasicMaterial color={[10, 1, 1]} />
      </mesh>

      <mesh position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial
          color="greenyellow"
          emissive="blue"
          emissiveIntensity={0.1}
        />
      </mesh>
    </>
  );
}
