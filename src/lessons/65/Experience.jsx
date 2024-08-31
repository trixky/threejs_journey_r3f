import { OrbitControls, useGLTF } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  BallCollider,
  CylinderCollider,
  InstancedRigidBodies,
} from "@react-three/rapier";
import { useRef, useState, useEffect, useMemo  } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function Experience() {
  const cubeCount = 100;
  // const cubesRef = useRef();
  const multiplier = 8;
  const instances = useMemo(() => new Array(cubeCount).fill().map((_, index) => {
    return {
      key: 'instance-' + index,
      position: [
        Math.random() * multiplier - multiplier / 2,
        Math.random() * multiplier,
        Math.random() * multiplier - multiplier / 2
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: [0.3, 0.3, 0.3]
    }
  }), []);

  const hamburger = useGLTF(import.meta.env.BASE_URL + "/pu59/hamburger.glb");

  const cubeRef = useRef();
  const twisterRef = useRef();

  // useEffect(() => {
  //   const multiplier = 10;
  //   for (let i = 0; i < cubeCount; i++) {
  //     const x = Math.random() * multiplier - multiplier / 2;
  //     const y = Math.random() * multiplier;
  //     const z = Math.random() * multiplier - multiplier / 2;
  //     cubesRef.current.setMatrixAt(
  //       i,
  //       new THREE.Matrix4().compose(
  //         new THREE.Vector3(x, y, z),
  //         new THREE.Quaternion().setFromEuler(
  //           new THREE.Euler(
  //             Math.random() * Math.PI,
  //             Math.random() * Math.PI,
  //             Math.random() * Math.PI
  //           )
  //         ),
  //         new THREE.Vector3(1, 1, 1)
  //       )
  //     );
  //   }
  // }, []);

  const [hitSound] = useState(
    () => new Audio(import.meta.env.BASE_URL + "/physic/hit.mp3")
  );
  console.log(hitSound);

  function cubeJump() {
    const cubeMass = cubeRef.current.mass();
    cubeRef.current.applyImpulse({ x: 0, y: 5 * cubeMass, z: 0 });
    cubeRef.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    });
  }

  function collisionHandler(event) {
    hitSound.currentTime = 0;
    hitSound.volume = 0.5 + Math.random() * 0.5;
    hitSound.play();
  }

  useFrame((state, delta) => {
    if (twisterRef.current) {
      const elapsedTime = state.clock.getElapsedTime();

      const eulerRotation = new THREE.Euler(0, elapsedTime * 5, 0);
      const quaternionRotation = new THREE.Quaternion();
      quaternionRotation.setFromEuler(eulerRotation);
      twisterRef.current.setNextKinematicRotation(quaternionRotation);

      const angle = elapsedTime * 0.5;
      const x = Math.sin(angle) * 2;
      const z = Math.cos(angle) * 2;
      twisterRef.current.setNextKinematicTranslation({ x, y: -0.3, z });
    }
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <Physics debug={false} gravity={[0, -9.8, 0]}>
        {/* -------------- BALL */}
        <RigidBody colliders="ball">
          <mesh castShadow position={[-3, 3, -3]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        {/* -------------- CUBE */}
        <RigidBody
          ref={cubeRef}
          position={[0, 10, 0]}
          restitution={0.5}
          friction={-0.5}
          colliders={false}
        >
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="blue" />
          </mesh>
          <CuboidCollider args={[0.5, 0.5, 0.5]} mass={0.5} />
        </RigidBody>
        {/* -------------- CUBES */}
        <RigidBody>
          <mesh castShadow position={[3, 2, -3]} scale={1}>
            <boxGeometry args={[3, 2, 1]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          <mesh castShadow position={[4, 2, 1]} scale={1}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>
        {/* -------------- TORUS */}
        <RigidBody
          // colliders={false}
          colliders="trimesh"
          position={[-3, 1, -3]}
          rotation={[Math.PI * 0.5, 0, 0]}
        >
          {/* <RigidBody colliders="trimesh"> */}
          {/* <RigidBody colliders="hull"> */}
          {/* <CuboidCollider args={[1.5, 1.5, 0.5]} />
          <CuboidCollider
            args={[0.25, 1, 0.25]}
            position={[0, 0, 1]}
            rotation={[-Math.PI / 2, 0, 0.35]}
          /> */}
          {/* <BallCollider args={[1.5]} /> */}
          <mesh
            castShadow
            // position={[0, 1, 0]}
            // rotation={[Math.PI * 0.5, 0, 0]}
          >
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>
        {/* -------------- TWISTER */}
        <RigidBody
          ref={twisterRef}
          position={[0, -0.8, 0]}
          friction={0}
          type="kinematicPosition"
          onCollisionEnter={collisionHandler}
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry args={[1, 1]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>
        {/* -------------- HAMBURGER */}
        <RigidBody colliders="hull" position={[0, 4, 0]}>
          <primitive object={hamburger.scene} scale={0.25} />
          {/* <CylinderCollider args={[0.5, 1.25]} /> */}
        </RigidBody>

        {/* -------------- FLOOR */}
        <RigidBody type="fixed">
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
        {/* -------------- WALLS */}
        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
        </RigidBody>
        {/* -------------- INSTANCED CUBES */}
        <InstancedRigidBodies instances={instances}>
          <instancedMesh
            // ref={cubesRef}
            castShadow
            receiveShadow
            args={[null, null, cubeCount]}
          >
            <boxGeometry />
            <meshNormalMaterial />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  );
}
