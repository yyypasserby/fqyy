import { css, StyleSheet } from "aphrodite";
import React from "react";
import { useRecoilValue } from "recoil";
import TileComponent from "../components/TileComponent";
import {
  useEndTurnAction,
  useEndUnitPhaseAction,
  useMoveUnitAction,
} from "../data/atomActionHooks/BattleAtomHooks";
import { BattleAtom } from "../data/atoms/BattleAtom";
import { BattleMapActionRecord } from "../data/records/BattleMapActionRecord";
import { BattleLocationInfoSelector } from "../data/selectors/BattleLocationInfoSelector";
import { LocationType } from "../data/type/LocationType";
import { getPhaseDescription } from "../utils/getPhaseDescription";
import { useMapActionEffect } from "./BattleHooks";

function Battle() {
  const { map, enemyUnits, currentTurn, maxTurn, phase } = useRecoilValue(
    BattleAtom
  );
  const battleLocationInfo = useRecoilValue(BattleLocationInfoSelector);
  const moveUnitAction = useMoveUnitAction();
  const endUnitPhaseAction = useEndUnitPhaseAction();
  const endTurnAction = useEndTurnAction();
  const [
    { actionMode, actionTargetLocation },
    mapState,
    setMapAction,
    resetMapAction,
  ] = useMapActionEffect();

  const onEmptyModeClick = React.useCallback(
    ([x, y]: LocationType) => {
      const unitRecord = battleLocationInfo([x, y]);
      if (unitRecord != null) {
        setMapAction(
          BattleMapActionRecord({
            actionMode: "InMove",
            actionTargetLocation: [x, y],
          })
        );
      }
    },
    [battleLocationInfo, setMapAction]
  );
  const onInMoveModeClick = React.useCallback(
    ([x, y]: LocationType) => {
      const isMovableArea = mapState.get(x + y * map.width) === "showMove";
      if (isMovableArea) {
        if (actionTargetLocation == null) {
          return console.error("bad state for mapAction target");
        }
        const targetRecord = battleLocationInfo(actionTargetLocation);

        // Doesn't have a unit on the position
        const unitRecord = battleLocationInfo([x, y]);
        if (unitRecord == null || unitRecord === targetRecord) {
          //  Move the unit
          targetRecord?.name != null &&
            moveUnitAction(targetRecord?.name, [x, y]);
          setMapAction(
            BattleMapActionRecord({
              actionMode: "InAction",
              actionTargetLocation: [x, y],
            })
          );
        } else {
          alert("Can't move to that field");
        }
      } else {
        resetMapAction();
      }
    },
    [
      actionTargetLocation,
      battleLocationInfo,
      map.width,
      mapState,
      moveUnitAction,
      resetMapAction,
      setMapAction,
    ]
  );
  const onInActionModeClick = React.useCallback(
    ([x, y]: LocationType) => {
      const isAttackArea = mapState.get(x + y * map.width) === "showAttack";
      if (isAttackArea) {
        if (actionTargetLocation == null) {
          return console.error("bad state for mapAction target");
        }
        const targetRecord = battleLocationInfo(actionTargetLocation);

        const unitRecord = battleLocationInfo([x, y]);
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
    [actionTargetLocation, battleLocationInfo, enemyUnits, map.width, mapState]
  );
  const onTileComponentClick = React.useCallback(
    (location: LocationType) => {
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

  const endPhase = React.useCallback(() => {
    resetMapAction();

    if (actionTargetLocation == null) {
      return console.error("bad state for mapAction target");
    }
    const targetRecord = battleLocationInfo(actionTargetLocation);
    targetRecord?.name && endUnitPhaseAction(targetRecord?.name);
  }, [
    actionTargetLocation,
    battleLocationInfo,
    endUnitPhaseAction,
    resetMapAction,
  ]);

  return (
    <div>
      <h1>Battle</h1>
      <h2>Max turn: {maxTurn}</h2>
      <h2>
        Turn {currentTurn}: {getPhaseDescription(phase)}
      </h2>
      <button onClick={endTurnAction}>End Turn</button>
      {actionMode === "InAction" && (
        <div>
          <h2>Unit Actions</h2>
          <button onClick={endPhase}>End Phase</button>
          <button onClick={() => {}}>Cancel</button>
        </div>
      )}
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
    </div>
  );
}

export default Battle;

const styles = StyleSheet.create({
  row: {
    height: 100,
  },
});
