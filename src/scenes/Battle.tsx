import { css, StyleSheet } from "aphrodite";
import { List } from "immutable";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import TileComponent from "../components/TileComponent";
import { BattleAtom } from "../data/atoms/BattleAtom";
import { BattleLocationInfoSelector } from "../data/selectors/BattleLocationInfoSelector";
import { LocationType } from "../data/type/LocationType";
import { computeMovableLocations } from "../utils/computeMovableLocations";
import { useResetState } from "../utils/useResetState";

export type TileStateType = "normal" | "showMove";
export type ActionModeType = "empty" | "InMove" | "InAction";

function Battle() {
  const [{ map }] = useRecoilState(BattleAtom);
  const battleLocationInfo = useRecoilValue(BattleLocationInfoSelector);

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
            mutable.set(locX + locY * map.width, "showMove");
          });
        });
      });
    },
    [map.width, setMapState]
  );

  const initialMapAction: [ActionModeType, LocationType | null] = [
    "empty",
    null,
  ];
  const [mapAction, setMapAction, resetMapAction] = useResetState(
    initialMapAction
  );

  const onEmptyModeClick = React.useCallback(
    ([x, y]) => {
      const unitRecord = battleLocationInfo(x, y);
      if (unitRecord != null) {
        setMapAction(["InMove", [x, y]]);
      }
    },
    [battleLocationInfo, setMapAction]
  );
  const onInMoveModeClick = React.useCallback(
    ([x, y]) => {
      const isMovableArea = mapState.get(x + y * map.width) === "showMove";
      const [, target] = mapAction;
      if (isMovableArea) {
        const unitRecord = battleLocationInfo(x, y);
        if (target == null) {
          return console.error("bad state for mapAction target");
        }
        const [targetX, targetY] = target;
        const targetRecord = battleLocationInfo(targetX, targetY);
        // Doesn't have a unit on the position
        if (unitRecord == null || unitRecord === targetRecord) {
          // TODO update battle info to move the unit
          console.log(targetRecord?.name);
        } else {
          alert("Can't move to that field");
        }
      } else {
        resetMapAction();
      }
    },
    [battleLocationInfo, map.width, mapAction, mapState, resetMapAction]
  );
  const onInActionModeClick = React.useCallback(([x, y]) => {}, []);
  const onTileComponentClick = React.useCallback(
    (location) => {
      const [mode] = mapAction;
      switch (mode) {
        case "empty":
          onEmptyModeClick(location);
          break;
        case "InMove":
          onInMoveModeClick(location);
          break;
        case "InAction":
          onInActionModeClick(location);
          break;
      }
    },
    [mapAction, onEmptyModeClick, onInActionModeClick, onInMoveModeClick]
  );

  React.useEffect(() => {
    const [actionMode, actionTarget] = mapAction;
    switch (actionMode) {
      case "InMove":
        if (actionTarget != null) {
          const [x, y] = actionTarget;
          const unitRecord = battleLocationInfo(x, y);
          setBatchMapState(
            computeMovableLocations(
              actionTarget,
              unitRecord?.move ?? 1,
              map.height,
              map.width
            ),
            "showMove"
          );
        }
        break;
      case "empty":
        resetMapState();
        break;
    }
  }, [
    mapAction,
    battleLocationInfo,
    map.height,
    map.width,
    setBatchMapState,
    resetMapState,
  ]);

  return (
    <div>
      <h1>Battle</h1>
      <div>
        {map.tiles.map((row, i) => (
          <div className={css(styles.row)} key={i}>
            {row.map((tile, j) => {
              return (
                <TileComponent
                  locX={j}
                  locY={i}
                  key={j}
                  tile={tile}
                  tileState={mapState.get(i * map.width + j)}
                  onClick={() => onTileComponentClick([j, i])}
                  unit={battleLocationInfo(j, i)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Battle;

const styles = StyleSheet.create({
  row: {
    height: 100,
  },
});
