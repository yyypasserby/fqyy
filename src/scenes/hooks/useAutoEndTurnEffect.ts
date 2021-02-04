import React from "react";
import { useRecoilValue } from "recoil";
import { useEndTurnAction } from "../../data/actions/useEndTurnAction";
import { BattleAtom } from "../../data/atoms/BattleAtom";
import { BattleMapActionRecordType } from "../../data/records/BattleMapActionRecord";
import { Phases } from "../../data/type/Phases";
import { useDialog } from "./useDialog";

export function useAutoEndTurnEffect(
  mapAction: BattleMapActionRecordType
): JSX.Element {
  const { currentTurn, phase, ourUnits, enemyUnits } = useRecoilValue(
    BattleAtom
  );
  const endTurnAction = useEndTurnAction();
  const [showDialog, dialog] = useDialog({
    headline: "Do you want to end turn?",
    primaryAction: "Yes",
    secondaryAction: "No",
    primaryActionCallback: endTurnAction,
  });

  React.useEffect(() => {
    if (mapAction.actionMode !== "EMPTY") {
      return;
    }
    let units = phase === Phases.OUR_PHASE ? ourUnits : enemyUnits;
    if (units.find((unit) => unit.currentTurn < currentTurn) == null) {
      // eslint-disable-next-line no-restricted-globals
      showDialog();
    }
  }, [
    currentTurn,
    endTurnAction,
    enemyUnits,
    mapAction.actionMode,
    ourUnits,
    phase,
    showDialog,
  ]);

  return dialog;
}
