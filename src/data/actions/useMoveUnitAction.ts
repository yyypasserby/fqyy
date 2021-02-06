import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

import { BattleAtom } from "../atoms/BattleAtom";
import { LocationType } from "../type/LocationType";

export function useMoveUnitAction(): (
  name: string,
  [x, y]: LocationType
) => void {
  const setBattle = useSetRecoilState(BattleAtom);
  return useCallback(
    (name: string, [x, y]: LocationType) => {
      setBattle((prev) => {
        return prev.withMutations((mutable) => {
          const { ourUnits, enemyUnits } = mutable;
          const ourUnitIndex = ourUnits.findIndex((unit) => unit.name === name);
          if (ourUnitIndex !== -1) {
            mutable.set(
              "ourUnits",
              ourUnits.update(ourUnitIndex, (unit) =>
                unit.set("locX", x).set("locY", y)
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
                unit.set("locX", x).set("locY", y)
              )
            );
          }
        });
      });
    },
    [setBattle]
  );
}
