import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { BattleAtom } from "../atoms/BattleAtom";

export function useEndUnitPhaseAction(): (name: string) => void {
  const setBattle = useSetRecoilState(BattleAtom);
  return useCallback(
    (name: string) => {
      setBattle((prev) => {
        return prev.withMutations((mutable) => {
          const { ourUnits, enemyUnits } = mutable;
          const ourUnitIndex = ourUnits.findIndex((unit) => unit.name === name);
          if (ourUnitIndex !== -1) {
            mutable.set(
              "ourUnits",
              ourUnits.update(ourUnitIndex, (unit) =>
                unit.update("currentTurn", (turn) => turn + 1)
              )
            );
          }

          const enemyUnitIndex = enemyUnits.findIndex(
            (unit) => unit.name === name
          );
          if (enemyUnitIndex !== -1) {
            mutable.set(
              "enemyUnits",
              enemyUnits.update(enemyUnitIndex, (unit) =>
                unit.update("currentTurn", (turn) => turn + 1)
              )
            );
          }
        });
      });
    },
    [setBattle]
  );
}
