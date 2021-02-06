import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

import { BattleAtom } from "../atoms/BattleAtom";
import { UnitStates } from "../type/UnitStates";

export function useSetDeadStateAction(): (name: string) => void {
  const setBattle = useSetRecoilState(BattleAtom);
  return useCallback(
    (name) => {
      setBattle((prev) => {
        return prev.withMutations((mutable) => {
          const { ourUnits, enemyUnits } = mutable;
          const ourUnitIndex = ourUnits.findIndex((unit) => unit.name === name);
          if (ourUnitIndex !== -1) {
            mutable.set(
              "ourUnits",
              ourUnits.update(ourUnitIndex, (unit) =>
                unit.set("state", UnitStates.DEAD)
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
                unit.set("state", UnitStates.DEAD)
              )
            );
          }
        });
      });
    },
    [setBattle]
  );
}
