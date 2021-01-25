import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { PathHistoryListAtom } from "../data/atoms/PathHistoryListAtom";
import { PathHistoryInfoSelector } from "../data/selectors/PathHistoryInfoSelector";

const CHOICES = [1, 2, 3];
function Paths() {
  const [pathHistory, setPathHistory] = useRecoilState(PathHistoryListAtom);
  const { pathLength, lastPath } = useRecoilValue(PathHistoryInfoSelector);
  const selectAPath = React.useCallback(
    (item) => {
      setPathHistory(pathHistory.push(item));
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
