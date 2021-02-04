import React from "react";
import { useRecoilValue } from "recoil";
import { BattleAtom } from "../../data/atoms/BattleAtom";
import { BattleMapActionRecordType } from "../../data/records/BattleMapActionRecord";
import { BattleLocationInfoSelector } from "../../data/selectors/BattleLocationInfoSelector";
import { ActionModes } from "../../data/type/ActionModes";
import { MapStateType, TileStates } from "../../data/type/TileStates";
import { computeMovableLocations } from "../../utils/computeMovableLocations";
import { usePrevious } from "../../utils/usePrevious";
import { useMapState } from "./useMapState";

export function useMapActionEffect(
  mapAction: BattleMapActionRecordType
): MapStateType {
  const { map } = useRecoilValue(BattleAtom);
  const battleLocationInfo = useRecoilValue(BattleLocationInfoSelector);
  const [mapState, setBatchMapState, resetMapState] = useMapState();

  const prevMapAction = usePrevious(mapAction);

  React.useEffect(() => {
    if (prevMapAction === mapAction) {
      return;
    }

    resetMapState();
    const { actionMode, actionTargetLocation } = mapAction;
    switch (actionMode) {
      case ActionModes.IN_ACTION:
        if (actionTargetLocation != null) {
          setBatchMapState(
            computeMovableLocations(
              actionTargetLocation,
              1,
              map.height,
              map.width
            ),
            TileStates.SHOW_ATTACK
          );
        }
        break;
      case ActionModes.IN_MOVE:
        if (actionTargetLocation != null) {
          const unitRecord = battleLocationInfo(actionTargetLocation);
          setBatchMapState(
            computeMovableLocations(
              actionTargetLocation,
              unitRecord?.move ?? 1,
              map.height,
              map.width
            ),
            TileStates.SHOW_MOVE
          );
        }
        break;
      case ActionModes.EMPTY:
        break;
    }
  }, [
    battleLocationInfo,
    map.height,
    map.width,
    setBatchMapState,
    resetMapState,
    prevMapAction,
    mapAction,
  ]);

  return mapState;
}
