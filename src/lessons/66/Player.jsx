import { RigidBody, useRapier } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import useGame from "./stores/useGame";

export default function Player() {
  const body = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();

  const [smoothedCameraPosition] = useState(new THREE.Vector3(10, 10, 10));
  const [smoothedCameraTarget] = useState(new THREE.Vector3());

  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const blocksCount = useGame((state) => state.blocksCount);

  const reset = () => {
    body.current.setTranslation({ x: 0, y: 1, z: 0 });
    body.current.setLinvel({ x: 0, y: 0, z: 0 });
    body.current.setAngvel({ x: 0, y: 0, z: 0 });
  };

  useEffect(() => {
    const unsubscribeReset = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === "ready") reset();
      }
    );

    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (body.current !== null) {
          const origin = body.current.translation();
          origin.y -= 0.31;
          const direction = { x: 0, y: -1, z: 0 };
          const ray = new rapier.Ray(origin, direction);
          const hit = world.castRay(ray, 10, true);

          if (value && hit.timeOfImpact < 0.15)
            body.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
        }
      }
    );

    const unsubscribeAny = subscribeKeys(() => start());

    return () => {
      unsubscribeReset();
      unsubscribeJump();
      unsubscribeAny();
    };
  }, []);

  useFrame((state, delta) => {
    if (body.current === null) return;
    // ------------------------------------- CONTROLS
    const { forward, backward, leftward, rightward } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 1 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }
    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }
    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }
    body.current.applyImpulse(impulse);
    body.current.applyTorqueImpulse(torque);

    // ------------------------------------- CAMERA
    const bodyPosition = body.current.translation();
    const cameraPosition = new THREE.Vector3();
    // ***** CAMERA POSITION *****
    cameraPosition.copy(bodyPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;
    // ***** CAMERA TARGET ****
    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);
    if (bodyPosition.z < -((blocksCount) * 4 + 2)) end();
    if (bodyPosition.y < -4) reset();
  });

  return (
    <RigidBody
      ref={body}
      canSleep={false}
      colliders="ball"
      position={[0, 1, 0]}
      restitution={0.2}
      linearDamping={0.5}
      angularDamping={0.5}
      friction={1}
    >
      <mesh>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color="mediumpurple" />
      </mesh>
    </RigidBody>
  );
}
