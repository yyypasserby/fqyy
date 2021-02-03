import { List } from "immutable";
import React, { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";
import { useEndTurnAction } from "../data/atomActionHooks/BattleAtomHooks";
import { BattleAtom } from "../data/atoms/BattleAtom";
import {
  BattleMapActionRecord,
  BattleMapActionRecordType,
} from "../data/records/BattleMapActionRecord";
import { BattleLocationInfoSelector } from "../data/selectors/BattleLocationInfoSelector";
import { UnitListSelector } from "../data/selectors/UnitListSelector";
import { ActionModes } from "../data/type/ActionModes";
import { LocationType } from "../data/type/LocationType";
import { Phases } from "../data/type/Phases";
import {
  MapStateType,
  TileStates,
  TileStateType,
} from "../data/type/TileStates";
import { computeMovableLocations } from "../utils/computeMovableLocations";
import { usePrevious } from "../utils/usePrevious";
import { useResetState } from "../utils/useResetState";

export function useMapState(): [
  MapStateType,
  (locations: LocationType[], tileState: TileStateType) => void,
  () => void
] {
  const { map } = useRecoilValue(BattleAtom);
  const initialMapState = React.useMemo(
    () =>
      List<TileStateType>(
        map.tiles.flatMap((i) => new Array(i.length).fill("normal"))
      ),
    [map.tiles]
  );
  const [mapState, setMapState, resetMapState] = useResetState(initialMapState);
  const setBatchMapState = React.useCallback(
    (locations: LocationType[], tileState: TileStateType) => {
      setMapState((prev) => {
        return prev.withMutations((mutable) => {
          locations.forEach(([locX, locY]) => {
            mutable.set(locX + locY * map.width, tileState);
          });
        });
      });
    },
    [map.width, setMapState]
  );

  return [mapState, setBatchMapState, resetMapState];
}

export function useMapActionEffect(): [
  BattleMapActionRecordType,
  MapStateType,
  Dispatch<SetStateAction<BattleMapActionRecordType>>,
  () => void
] {
  const { map } = useRecoilValue(BattleAtom);
  const battleLocationInfo = useRecoilValue(BattleLocationInfoSelector);
  const [mapState, setBatchMapState, resetMapState] = useMapState();

  const [mapAction, setMapAction, resetMapAction] = useResetState(
    BattleMapActionRecord()
  );

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

  return [mapAction, mapState, setMapAction, resetMapAction];
}

export function useAutoEndTurnEffect(): void {
  const { currentTurn, phase, ourUnits, enemyUnits } = useRecoilValue(
    BattleAtom
  );
  const endTurnAction = useEndTurnAction();

  React.useEffect(() => {
    let units = phase === Phases.OUR_PHASE ? ourUnits : enemyUnits;
    if (units.find((unit) => unit.currentTurn < currentTurn) == null) {
      // eslint-disable-next-line no-restricted-globals
      const confirmation = confirm("Do you want to end turn?");
      if (confirmation) {
        endTurnAction();
      }
    }
  }, [currentTurn, endTurnAction, enemyUnits, ourUnits, phase]);
}
