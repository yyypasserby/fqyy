import React from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { CharaterListAtom } from "../data/atoms/CharacterListAtom";
import { GameAtom } from "../data/atoms/GameAtom";
import { PathHistoryListAtom } from "../data/atoms/PathHistoryListAtom";
import { GameRecord } from "../data/records/GameRecord";

function Home() {
  const [game, setGame] = useRecoilState(GameAtom);
  const resetCharacters = useResetRecoilState(CharaterListAtom);
  const resetPathHistory = useResetRecoilState(PathHistoryListAtom);
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
