import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

import { BattleAtom } from "../atoms/BattleAtom";
import { Phases } from "../type/Phases";

export function useEndTurnAction(): () => void {
  const setBattle = useSetRecoilState(BattleAtom);
  return useCallback(() => {
    setBattle((prev) => {
      return prev.withMutations((mutable) => {
        const { currentTurn, phase, ourUnits, enemyUnits } = mutable;
        if (phase === Phases.OUR_PHASE) {
          mutable.set(
            "ourUnits",
            ourUnits.map((unit) => unit.set("currentTurn", currentTurn))
          );
          mutable.set("phase", Phases.ENEMY_PHASE);
        }

        if (phase === Phases.ENEMY_PHASE) {
          mutable.set(
            "enemyUnits",
            enemyUnits.map((unit) => unit.set("currentTurn", currentTurn))
          );
          mutable.set("phase", Phases.OUR_PHASE);
          mutable.set("currentTurn", currentTurn + 1);
        }
      });
    });
  }, [setBattle]);
}
