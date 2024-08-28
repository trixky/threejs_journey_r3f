import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef } from "react";

export default function Fox() {
  const model = useGLTF(import.meta.env.BASE_URL + "/pu59/Fox/glTF/Fox.gltf");
  const animations = useAnimations(model.animations, model.scene);
  const groupRef = useRef();

  const {animation} = useControls({
    animation: {options: animations.names, value: animations.names[1]}
  });

  useFrame((scene, delta) => {
    // model.scene.rotation.z = Math.sin(delta) * 4;
    groupRef.current.rotation.y += delta;
  });

  useEffect(() => {
   const action = animations.actions[animation];
    action.reset().fadeIn(0.5).play();

    return () => {
      action.fadeOut(0.5);
    }

    // setTimeout(() => {
    //   animations.actions.Walk.play();
    //   animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1);
    // }, 1000);
  }, [animation]);

  return (
    <group ref={groupRef}>
      <primitive
        object={model.scene}
        scale={0.025}
        position={[0, -1, -2.8]}
        rotation-y={-Math.PI / 2}
      />
    </group>
  );
}
