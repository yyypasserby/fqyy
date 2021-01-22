import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { pathHistoryAtom } from "../data/atoms/pathHistoryAtom";
import { pathHistorySelector } from "../data/selectors/pathHistorySelectors";

const CHOICES = [1, 2, 3];
function Paths() {
  const [pathHistory, setPathHistory] = useRecoilState(pathHistoryAtom);
  const { pathLength, lastPath } = useRecoilValue(pathHistorySelector);
  const selectAPath = React.useCallback(
    (item) => {
      setPathHistory([...pathHistory, item]);
    },
    [pathHistory, setPathHistory]
  );

  return (
    <div>
      <h1>Paths</h1>
      <h2>Path History: [{pathHistory.join(",")}]</h2>
      <h2>You are at: {pathLength} level</h2>
      <h2>You choose option {lastPath} as your last path</h2>
      <div>
        <h2>Your next STEP:</h2>
        {CHOICES.map((choice) => (
          <button onClick={() => selectAPath(choice)}>{choice}</button>
        ))}
      </div>
    </div>
  );
}

export default Paths;
