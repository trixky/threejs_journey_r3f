import {
  OrbitControls,
  MeshReflectorMaterial,
  useGLTF,
  Clone,
} from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader, DRACOLoader } from "three/examples/jsm/Addons.js";
import { Perf } from "r3f-perf";
import Helmet from "./Helmet";
import Placeholder from "./Placeholder";
import { Suspense, useRef } from "react";
import Hamburger from "./Hamburger";
import Fox from "./Fox";

const BURGER_SCALE = 0.18;

export default function Experience() {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(import.meta.env.BASE_URL + "/draco/");

  const burgersRef = useRef();

  const burgerDreiModel = useGLTF(
    import.meta.env.BASE_URL + "/pu59/hamburger.glb"
  );
  // const burgerModel = useLoader(
  //   GLTFLoader,
  //   import.meta.env.BASE_URL + "/pu59/hamburger.glb"
  // );
  const burgerDreiDracoModel = useGLTF(
    import.meta.env.BASE_URL + "/pu59/hamburger-draco.glb"
  );
  // const burgerDracoModel = useLoader(
  //   GLTFLoader,
  //   import.meta.env.BASE_URL + "/pu59/hamburger-draco.glb",
  //   (loader) => {
  //     loader.setDRACOLoader(dracoLoader);
  //   }
  // );

  useFrame((scene, delta) => {
    burgersRef.current.rotation.y += delta;
    // if (burgerModel.scene) {
    //   burgerModel.scene.rotation.y += delta;
    // }
    if (burgerDreiModel.scene) {
      burgerDreiModel.scene.rotation.y += delta;
    }
    // if (burgerDracoModel.scene) {
    //   burgerDracoModel.scene.rotation.y += delta;
    // }
    if (burgerDreiDracoModel.scene) {
      burgerDreiDracoModel.scene.rotation.y += delta;
    }
  });

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={5} />
      <ambientLight intensity={1.5} />
      <mesh position-y={-1} position-z={-2.5} scale={[10, 15, 1]} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <MeshReflectorMaterial
          resolution={128}
          blur={[1000, 1000]}
          mixBlur={0}
          mirror={1}
          color="red"
        />
      </mesh>
      {/* <primitive
        object={burgerModel.scene}
        scale={BURGER_SCALE}
        position-x={3}
      /> */}
      <group ref={burgersRef}>
        <Clone
          object={burgerDreiModel.scene}
          scale={BURGER_SCALE}
          position-x={3}
        />
        <Clone
          object={burgerDreiModel.scene}
          scale={BURGER_SCALE}
          position-x={3}
          position-y={2}
        />
      </group>
      {/* <primitive
        object={burgerDracoModel.scene}
        scale={BURGER_SCALE}
        position-x={-3}
      /> */}
      <primitive
        object={burgerDreiDracoModel.scene}
        scale={BURGER_SCALE}
        position-y={1}
        position-x={-3}
      />
      <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 4, 2]} />}>
        <Helmet />
      </Suspense>
      <Hamburger scale={0.05} position={[0, 1, 1.2]} />
      <Fox />
    </>
  );
}
