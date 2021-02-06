import React from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { GameAtom } from "../data/atoms/GameAtom";

function Home() {
  const game = useRecoilValue(GameAtom);
  const routerHistory = useHistory();
  const resetGame = useResetRecoilState(GameAtom);
  const startNewGame = React.useCallback(() => {
    resetGame();
    routerHistory.push("/paths");
  }, [resetGame, routerHistory]);

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => routerHistory.push("/paths")}>
        Resume: {game.name}
      </button>
      <button onClick={startNewGame}>Start a new game</button>
    </div>
  );
}

export default Home;
