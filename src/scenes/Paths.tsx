import React from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { useAddPathAction } from "../data/atomActionHooks/GameAtomHooks";
import { BattleAtom } from "../data/atoms/BattleAtom";
import { LastPathSelector } from "../data/selectors/LastPathSelector";
import { PathHistoryListSelector } from "../data/selectors/PathHistoryListSelector";

const CHOICES = [1, 2, 3];

function Paths() {
  const routerHistory = useHistory();
  const pathHistoryList = useRecoilValue(PathHistoryListSelector);
  const lastPath = useRecoilValue(LastPathSelector);

  const addPathAction = useAddPathAction();
  const resetBattle = useResetRecoilState(BattleAtom);
  const selectAPath = React.useCallback(
    (item: number) => {
      addPathAction(item);
      resetBattle();

      routerHistory.push("/battle");
    },
    [addPathAction, resetBattle, routerHistory]
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
