import { useRecoilValue } from "recoil";
import { gameState } from "../data/atoms/gameAtom";

function Home() {
  const game = useRecoilValue(gameState);
  return (
    <div>
      <h1>Home</h1>
      <h2>Resume: {game.name}</h2>
    </div>
  );
}

export default Home;
