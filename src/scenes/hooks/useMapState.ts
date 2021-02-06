import { List } from "immutable";
import React from "react";
import { useRecoilValue } from "recoil";

import { BattleAtom } from "../../data/atoms/BattleAtom";
import { LocationType } from "../../data/type/LocationType";
import {
  MapStateType,
  TileStates,
  TileStateType,
} from "../../data/type/TileStates";
import { useResetState } from "../../utils/useResetState";

export function useMapState(): [
  MapStateType,
  (locations: LocationType[], tileState: TileStateType) => void,
  () => void
] {
  const { map } = useRecoilValue(BattleAtom);
  const initialMapState = React.useMemo(
    () =>
      List<TileStateType>(
        map.tiles.flatMap<TileStateType>((i) =>
          new Array<TileStateType>(i.length).fill(TileStates.NORMAL)
        )
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
