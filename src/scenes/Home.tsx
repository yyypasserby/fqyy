import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { gameState } from "../data/atoms/gameAtom";

function Home() {
  const [game, setGame] = useRecoilState(gameState);
  const startNewGame = React.useCallback(() => {
    const newID = game.id + 1;
    setGame({
      id: newID,
      name: "name" + newID,
    });
  }, [game.id, setGame]);

  return (
    <div>
      <h1>Home</h1>
      <div>
        <Link to="/paths">Resume: {game.name}</Link>
      </div>
      <button onClick={startNewGame}>Start a new game</button>
    </div>
  );
}

export default Home;
