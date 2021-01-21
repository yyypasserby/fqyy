import React from "react";
import { useRecoilState } from "recoil";
import { pathHistoryAtom } from "../data/atoms/pathHistoryAtom";

const CHOICES = [1, 2, 3];
function Paths() {
  const [pathHistory, setPathHistory] = useRecoilState(pathHistoryAtom);
  const selectAStep = React.useCallback(
    (item) => {
      setPathHistory([...pathHistory, item]);
    },
    [pathHistory, setPathHistory]
  );

  return (
    <div>
      <h1>Paths</h1>
      <h2>Path History: [{pathHistory.join(",")}]</h2>
      <div>
        <h2>Your next STEP:</h2>
        {CHOICES.map((choice) => (
          <button onClick={() => selectAStep(choice)}>{choice}</button>
        ))}
      </div>
    </div>
  );
}

export default Paths;
