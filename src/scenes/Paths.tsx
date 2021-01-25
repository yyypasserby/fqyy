import React from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { BattleAtom } from "../data/atoms/BattleAtom";
import { LastPathWriteableSelector } from "../data/selectors/LastPathWriteableSelector";
import { PathHistoryListSelector } from "../data/selectors/PathHistoryListSelector";

const CHOICES = [1, 2, 3];

function Paths() {
  const routerHistory = useHistory();
  const pathHistoryList = useRecoilValue(PathHistoryListSelector);
  const [lastPath, addPath] = useRecoilState(LastPathWriteableSelector);
  const resetBattle = useResetRecoilState(BattleAtom);
  const selectAPath = React.useCallback(
    (item: number) => {
      addPath(item);
      resetBattle();

      routerHistory.push("/battle");
    },
    [addPath, resetBattle, routerHistory]
  );

  return (
    <div>
      <h1>Paths</h1>
      <h2>Path History: [{pathHistoryList.join(",")}]</h2>
      <h2>You are at Level {pathHistoryList.size}</h2>
      <h2>You choose option {lastPath} as your last path</h2>
      <div>
        <h2>Your next STEP:</h2>
        {CHOICES.map((choice) => (
          <button key={choice} onClick={() => selectAPath(choice)}>
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Paths;
