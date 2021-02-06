import React from "react";
import { useRecoilValue } from "recoil";

import { useSetDeadStateAction } from "../../data/actions/useSetDeadStateAction";
import { BattleMapActionRecordType } from "../../data/records/BattleMapActionRecord";
import { UnitListSelector } from "../../data/selectors/UnitListSelector";

export function useSetDeadStateEffect(
  mapAction: BattleMapActionRecordType
): void {
  const ourUnits = useRecoilValue(UnitListSelector("ourUnits"));
  const enemyUnits = useRecoilValue(UnitListSelector("enemyUnits"));
  const setDeadStateAction = useSetDeadStateAction();

  React.useEffect(() => {
    if (mapAction.actionMode !== "EMPTY") {
      return;
    }
    const ourDeadUnit = ourUnits.find((unit) => unit.hp <= 0);
    if (ourDeadUnit) {
      setDeadStateAction(ourDeadUnit.name);
    }
    const enemyDeadUnit = enemyUnits.find((unit) => unit.hp <= 0);
    if (enemyDeadUnit) {
      setDeadStateAction(enemyDeadUnit.name);
    }
  }, [enemyUnits, mapAction.actionMode, ourUnits, setDeadStateAction]);
}
