import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { charaterAtom } from "../data/atoms/characterAtom";
import { gameAtom, GameRecord } from "../data/atoms/gameAtom";
import { pathHistoryAtom } from "../data/atoms/pathHistoryAtom";

function Home() {
  const [game, setGame] = useRecoilState(gameAtom);
  const resetCharacters = useResetRecoilState(charaterAtom);
  const resetPathHistory = useResetRecoilState(pathHistoryAtom);
  const routerHistory = useHistory();

  const startNewGame = React.useCallback(() => {
    const newID = game.id + 1;
    setGame(
      GameRecord({
        id: newID,
        name: "new game" + newID,
      })
    );
    resetCharacters();
    resetPathHistory();
    routerHistory.push("/paths");
  }, [game.id, resetCharacters, resetPathHistory, routerHistory, setGame]);

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
