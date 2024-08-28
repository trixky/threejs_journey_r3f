import { useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { GLTFLoader, DRACOLoader } from "three/examples/jsm/Addons.js";

export default function Helmet() {
  //   const dracoLoader = new DRACOLoader();
  //   dracoLoader.setDecoderPath(import.meta.env.BASE_URL + "/draco/");

  //   const helmetDracoModel = useLoader(
  //     GLTFLoader,
  //     import.meta.env.BASE_URL + "/pu59/FlightHelmet/glTF/FlightHelmet.gltf",
  //     (loader) => {
  //       loader.setDRACOLoader(dracoLoader);
  //     }
  //   );

  const helmetDreiDracoModel = useGLTF(
    import.meta.env.BASE_URL + "/pu59/FlightHelmet/glTF/FlightHelmet.gltf"
  );

  return (
    // <primitive object={helmetDracoModel.scene} scale={5} position-y={-1} />
    <primitive object={helmetDreiDracoModel.scene} scale={5} position-y={-1} />
  );
}

// Possible to preload the model:
// useGLTF.preload(
//   import.meta.env.BASE_URL + "/pu59/FlightHelmet/glTF/FlightHelmet.gltf"
// );
