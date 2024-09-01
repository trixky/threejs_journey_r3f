import * as THREE from "three";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Text, Float } from "@react-three/drei";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });
const floor2Material = new THREE.MeshStandardMaterial({ color: "greenyellow" });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

function BlockStart({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh
        position={[0, -0.1, 0]}
        geometry={boxGeometry}
        material={floor1Material}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
          font={
            import.meta.env.BASE_URL + "/final/bebas-neue-v9-latin-regular.woff"
          }
          scale={0.5}
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="center"
          position={[0.75, 0.65, 0]}
          rotation-y={-0.25}
        >
          Marble Race
          <meshBasicMaterial toneMapped={false} color="white" />
        </Text>
      </Float>
    </group>
  );
}

function BlockEnd({ position = [0, 0, 0] }) {
  const hamburger = useGLTF(import.meta.env.BASE_URL + "/pu59/hamburger.glb");

  hamburger.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
    }
  });

  useFrame((state, delta) => {
    const angle = delta * 0.5;
    hamburger.scene.rotation.y += angle;
  });

  return (
    <group position={position}>
      <mesh
        position={[0, 0, 0]}
        geometry={boxGeometry}
        material={floor1Material}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        position={[0, 0.2, 0]}
        type="fixed"
        colliders="hull"
        restitution={0.2}
        friction={0}
      >
        <primitive object={hamburger.scene} scale={0.2} />
      </RigidBody>
      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
          font={
            import.meta.env.BASE_URL + "/final/bebas-neue-v9-latin-regular.woff"
          }
          scale={1}
w          textAlign="center"
          position={[0, 2.25, 2]}
        >
          FINISH
          <meshBasicMaterial toneMapped={false} color="white" />
        </Text>
      </Float>
    </group>
  );
}

export function BlockSpinner({ position = [0, 0, 0] }) {
  const obstacle = useRef();
  const [speed] = useState(
    () => (Math.random() + 0.5) * (Math.random() > 0.5 ? 1 : -1)
  );

  useFrame((state) => {
    if (obstacle.current !== null) {
      const elapsedTime = state.clock.getElapsedTime();

      const rotation = new THREE.Quaternion();
      rotation.setFromEuler(new THREE.Euler(0, elapsedTime * speed, 0));
      obstacle.current.setNextKinematicRotation(rotation);
    }
  });

  return (
    <group position={position}>
      <mesh
        position={[0, -0.1, 0]}
        geometry={boxGeometry}
        material={floor2Material}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export function BlockLimbo({ position = [0, 0, 0] }) {
  const obstacle = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (obstacle.current !== null) {
      const elapsedTime = state.clock.getElapsedTime();

      const y = Math.sin(elapsedTime) + 1.15;
      obstacle.current.setNextKinematicTranslation({
        x: position[0],
        y: position[1] + y,
        z: position[2],
      });
    }
  });

  return (
    <group position={position}>
      <mesh
        position={[0, -0.1, 0]}
        geometry={boxGeometry}
        material={floor2Material}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

export function BlockAxe({ position = [0, 0, 0] }) {
  const obstacle = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (obstacle.current !== null) {
      const elapsedTime = state.clock.getElapsedTime();

      const x = Math.sin(elapsedTime);
      obstacle.current.setNextKinematicTranslation({
        x: position[0] + x,
        y: position[1] + 0.75,
        z: position[2],
      });
    }
  });

  return (
    <group position={position}>
      <mesh
        position={[0, -0.1, 0]}
        geometry={boxGeometry}
        material={floor2Material}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
}

function Bounds({ length = 1 }) {
  return (
    <RigidBody type="fixed" restitution={0.2} friction={0}>
      <mesh
        receiveShadow
        position={[-2.15, 0.75, -length * 2 + 2]}
        scale={[0.3, 1.5, length * 4]}
        geometry={boxGeometry}
        material={wallMaterial}
      />
      <mesh
        castShadow
        position={[2.15, 0.75, -length * 2 + 2]}
        scale={[0.3, 1.5, length * 4]}
        geometry={boxGeometry}
        material={wallMaterial}
      />
      <mesh
        castShadow
        position={[0, 0.75, -length * 4 + 2]}
        scale={[4, 1.5, 0.3]}
        geometry={boxGeometry}
        material={wallMaterial}
      />
      <CuboidCollider
        args={[2, 0.1, 2 * length]}
        position={[0, -0.1, -(length * 2) + 2]}
        restitution={0.2}
        friction={1}
      />
    </RigidBody>
  );
}

export function Level({
  count = 5,
  types = [BlockSpinner, BlockLimbo, BlockAxe],
  seed = 0,
}) {
  const blocks = useMemo(() => {
    const blocks = [];

    for (let i = 0; i < count; i++) {
      const Block = types[Math.floor(Math.random() * types.length)];
      blocks.push(Block);
    }

    return blocks;
  }, [count, types, seed]);

  return (
    <>
      <BlockStart position={[0, 0, 0]} />
      {blocks.map((Block, index) => (
        <Block key={index} position={[0, 0, -(index + 1) * 4]} />
      ))}

      <BlockEnd position={[0, 0, -(count + 1) * 4]} />

      <Bounds length={count + 2} />
    </>
  );
}
