import { css, StyleSheet } from "aphrodite";
import { List } from "immutable";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import TileComponent from "../components/TileComponent";
import { BattleAtom } from "../data/atoms/BattleAtom";
import { BattleLocationInfoSelector } from "../data/selectors/BattleLocationInfoSelector";
import { LocationType } from "../data/type/LocationType";
import { computeMovableLocations } from "../utils/computeMovableLocations";
import { usePrevious } from "../utils/usePrevious";
import { useResetState } from "../utils/useResetState";

export type TileStateType = "normal" | "showMove" | "showAttack";
export type ActionModeType = "empty" | "InMove" | "InAction";

function Battle() {
  const [{ map, enemyUnits }, setBattle] = useRecoilState(BattleAtom);
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
            mutable.set(locX + locY * map.width, tileState);
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
  const [actionMode, actionTarget] = mapAction;

  const onEmptyModeClick = React.useCallback(
    ([x, y]) => {
      const unitRecord = battleLocationInfo([x, y]);
      if (unitRecord != null) {
        setMapAction(["InMove", [x, y]]);
      }
    },
    [battleLocationInfo, setMapAction]
  );
  const onInMoveModeClick = React.useCallback(
    ([x, y]) => {
      const isMovableArea = mapState.get(x + y * map.width) === "showMove";
      if (isMovableArea) {
        const unitRecord = battleLocationInfo([x, y]);
        if (actionTarget == null) {
          return console.error("bad state for mapAction target");
        }
        const targetRecord = battleLocationInfo(actionTarget);
        // Doesn't have a unit on the position
        console.log({ unitRecord, targetRecord, actionTarget });
        if (unitRecord == null || unitRecord === targetRecord) {
          //  Move the unit
          setBattle((prev) => {
            return prev
              .update("ourUnits", (units) => {
                const targetIndex = units.findIndex(
                  (unit) => unit.name === targetRecord?.name
                );
                if (targetIndex === -1) return units;
                return units.update(targetIndex, (unit) => {
                  return unit.set("locX", x).set("locY", y);
                });
              })
              .update("enemyUnits", (units) => {
                const targetIndex = units.findIndex(
                  (unit) => unit.name === targetRecord?.name
                );
                if (targetIndex === -1) return units;
                return units.update(targetIndex, (unit) => {
                  return unit.set("locX", x).set("locY", y);
                });
              });
          });
          setMapAction(["InAction", [x, y]]);
        } else {
          alert("Can't move to that field");
        }
      } else {
        resetMapAction();
      }
    },
    [
      actionTarget,
      battleLocationInfo,
      map.width,
      mapState,
      resetMapAction,
      setBattle,
      setMapAction,
    ]
  );
  const onInActionModeClick = React.useCallback(
    ([x, y]) => {
      const isAttackArea = mapState.get(x + y * map.width) === "showAttack";
      if (isAttackArea) {
        const unitRecord = battleLocationInfo([x, y]);
        if (actionTarget == null) {
          return console.error("bad state for mapAction target");
        }
        const targetRecord = battleLocationInfo(actionTarget);
        const enemyIndex = enemyUnits.findIndex(
          (unit) => unit.name === unitRecord?.name
        );
        if (enemyIndex !== -1) {
          // TODO: Do a attack
          alert("Attacked");
        } else {
          alert("It is not an enemy");
        }
      } else {
        alert("It is not in the range of attack");
      }
    },
    [actionTarget, battleLocationInfo, enemyUnits, map.width, mapState]
  );
  const endTurn = React.useCallback(() => {
    resetMapAction();
  }, [resetMapAction]);

  const onTileComponentClick = React.useCallback(
    (location) => {
      switch (actionMode) {
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
    [actionMode, onEmptyModeClick, onInActionModeClick, onInMoveModeClick]
  );

  const prevActionMode = usePrevious(actionMode);
  React.useEffect(() => {
    if (prevActionMode === actionMode) {
      return;
    }

    resetMapState();
    switch (actionMode) {
      case "InAction":
        if (actionTarget != null) {
          setBatchMapState(
            computeMovableLocations(actionTarget, 1, map.height, map.width),
            "showAttack"
          );
        }
        break;
      case "InMove":
        if (actionTarget != null) {
          const unitRecord = battleLocationInfo(actionTarget);
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
        break;
    }
  }, [
    battleLocationInfo,
    map.height,
    map.width,
    setBatchMapState,
    resetMapState,
    actionMode,
    actionTarget,
    prevActionMode,
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
                  unit={battleLocationInfo([j, i])}
                />
              );
            })}
          </div>
        ))}
      </div>
      {actionMode === "InAction" && <button onClick={endTurn}>End Turn</button>}
    </div>
  );
}

export default Battle;

const styles = StyleSheet.create({
  row: {
    height: 100,
  },
});
