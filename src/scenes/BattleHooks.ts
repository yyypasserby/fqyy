import { List } from "immutable";
import React from "react";
import { useRecoilValue } from "recoil";
import { BattleAtom } from "../data/atoms/BattleAtom";
import {
  BattleMapActionRecord,
  BattleMapActionRecordType,
} from "../data/records/BattleMapActionRecord";
import { BattleLocationInfoSelector } from "../data/selectors/BattleLocationInfoSelector";
import { ActionModes } from "../data/type/ActionModes";
import { LocationType } from "../data/type/LocationType";
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
  (mapAction: BattleMapActionRecordType) => void,
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
