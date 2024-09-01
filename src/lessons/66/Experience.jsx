import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Lights from "./Lights.jsx";
import Player from "./Player.jsx";
import { Level } from "./Level.jsx";
import useGame from "./stores/useGame";

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blockSeed = useGame((state) => state.blockSeed);

  return (
    <>
      <OrbitControls makeDefault />

      <Physics>
        <Lights />
        <Level count={blocksCount} seed={blockSeed} />
        <Player />
      </Physics>
    </>
  );
}
