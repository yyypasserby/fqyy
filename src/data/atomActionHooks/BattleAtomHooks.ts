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
        if (phase === "ourPhase") {
          mutable.set(
            "ourUnits",
            ourUnits.map((unit) => unit.set("currentTurn", currentTurn))
          );
          mutable.set("phase", "enemyPhase");
        }

        if (phase === "enemyPhase") {
          mutable.set(
            "enemyUnits",
            enemyUnits.map((unit) => unit.set("currentTurn", currentTurn))
          );
          mutable.set("phase", "ourPhase");
          mutable.set("currentTurn", currentTurn + 1);
        }
      });
    });
  }, [setBattle]);
}
