import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { BattleAtom } from "../atoms/BattleAtom";
import { LocationType } from "../type/LocationType";
import { Phases } from "../type/Phases";

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
