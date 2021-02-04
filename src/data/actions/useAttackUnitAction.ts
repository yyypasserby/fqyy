import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { BattleAtom } from "../atoms/BattleAtom";

export function useAttackUnitAction(): (
  fromUnitName: string,
  toUnitName: string
) => void {
  const setBattle = useSetRecoilState(BattleAtom);
  return useCallback(
    (fromUnitName: string, toUnitName: string) => {
      setBattle((prev) => {
        return prev.withMutations((mutable) => {
          const { ourUnits, enemyUnits } = mutable;
          const fromOurUnit = ourUnits.find(
            (unit) => unit.name === fromUnitName
          );
          const fromEnemyUnit = enemyUnits.find(
            (unit) => unit.name === fromUnitName
          );
          const toOurUnitIndex = ourUnits.findIndex(
            (unit) => unit.name === toUnitName
          );
          const toEnemyUnitIndex = enemyUnits.findIndex(
            (unit) => unit.name === toUnitName
          );

          if (fromEnemyUnit != null && toOurUnitIndex !== -1) {
            mutable.set(
              "ourUnits",
              ourUnits.update(toOurUnitIndex, (unit) =>
                unit.update(
                  "hp",
                  (hp) => hp - (fromEnemyUnit.attack - unit.defense)
                )
              )
            );
          }
          if (fromOurUnit != null && toEnemyUnitIndex !== -1) {
            mutable.set(
              "enemyUnits",
              enemyUnits.update(toEnemyUnitIndex, (unit) =>
                unit.update(
                  "hp",
                  (hp) => hp - (fromOurUnit.attack - unit.defense)
                )
              )
            );
          }
        });
      });
    },
    [setBattle]
  );
}
