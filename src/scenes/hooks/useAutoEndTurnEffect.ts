import React from "react";
import { useRecoilValue } from "recoil";
import { useEndTurnAction } from "../../data/actions/useEndTurnAction";
import { BattleAtom } from "../../data/atoms/BattleAtom";
import { BattleMapActionRecordType } from "../../data/records/BattleMapActionRecord";
import { Phases } from "../../data/type/Phases";

export function useAutoEndTurnEffect(
  mapAction: BattleMapActionRecordType
): void {
  const { currentTurn, phase, ourUnits, enemyUnits } = useRecoilValue(
    BattleAtom
  );
  const endTurnAction = useEndTurnAction();

  React.useEffect(() => {
    if (mapAction.actionMode !== "EMPTY") {
      return;
    }
    let units = phase === Phases.OUR_PHASE ? ourUnits : enemyUnits;
    if (units.find((unit) => unit.currentTurn < currentTurn) == null) {
      // eslint-disable-next-line no-restricted-globals
      const confirmation = confirm("Do you want to end turn?");
      if (confirmation) {
        endTurnAction();
      }
    }
  }, [
    currentTurn,
    endTurnAction,
    enemyUnits,
    mapAction.actionMode,
    ourUnits,
    phase,
  ]);
}
