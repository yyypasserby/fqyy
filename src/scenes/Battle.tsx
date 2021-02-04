import { css, StyleSheet } from "aphrodite";
import React from "react";
import { useRecoilValue } from "recoil";
import TileComponent from "../components/TileComponent";
import { useAttackUnitAction } from "../data/actions/useAttackUnitAction";
import { useEndTurnAction } from "../data/actions/useEndTurnAction";
import { useEndUnitPhaseAction } from "../data/actions/useEndUnitPhaseAction";
import { useMoveUnitAction } from "../data/actions/useMoveUnitAction";
import { BattleAtom } from "../data/atoms/BattleAtom";
import { BattleMapActionRecord } from "../data/records/BattleMapActionRecord";
import { BattleLocationInfoSelector } from "../data/selectors/BattleLocationInfoSelector";
import { UnitSideSelector } from "../data/selectors/UnitSideSelector";
import { ActionModes } from "../data/type/ActionModes";
import { LocationType } from "../data/type/LocationType";
import { TileStates } from "../data/type/TileStates";
import { getPhaseDescription } from "../utils/getPhaseDescription";
import { isUnitPhase } from "../utils/isUnitPhase";
import { useResetState } from "../utils/useResetState";
import { useAutoEndTurnEffect } from "./hooks/useAutoEndTurnEffect";
import { useMapActionEffect } from "./hooks/useMapActionEffect";

function Battle() {
  const { map, currentTurn, maxTurn, phase, weather } = useRecoilValue(
    BattleAtom
  );
  const battleLocationInfo = useRecoilValue(BattleLocationInfoSelector);
  const unitSideInfo = useRecoilValue(UnitSideSelector);

  const moveUnitAction = useMoveUnitAction();
  const attackUnitAction = useAttackUnitAction();
  const endUnitPhaseAction = useEndUnitPhaseAction();
  const endTurnAction = useEndTurnAction();

  const [mapAction, setMapAction, resetMapAction] = useResetState(
    BattleMapActionRecord()
  );
  const {
    actionMode,
    actionTargetLocation,
    actionTargetInitialLocation,
  } = mapAction;

  const mapState = useMapActionEffect(mapAction);
  const endTurnDialog = useAutoEndTurnEffect(mapAction);

  const onEmptyModeClick = React.useCallback(
    ([x, y]: LocationType) => {
      const unitRecord = battleLocationInfo([x, y]);
      if (unitRecord != null) {
        setMapAction(
          BattleMapActionRecord({
            actionMode: ActionModes.IN_MOVE,
            actionTargetLocation: [x, y],
            actionTargetInitialLocation: [x, y],
          })
        );
      }
    },
    [battleLocationInfo, setMapAction]
  );
  const onInMoveModeClick = React.useCallback(
    ([x, y]: LocationType) => {
      const isMovableArea =
        mapState.get(x + y * map.width) === TileStates.SHOW_MOVE;
      if (isMovableArea) {
        if (actionTargetLocation == null) {
          return console.error("bad state for actionTargetLocation");
        }
        const targetRecord = battleLocationInfo(actionTargetLocation);
        if (targetRecord == null) {
          return console.error("bad state for battleLocationInfo");
        }
        const side = unitSideInfo(targetRecord.name);
        if (side == null) {
          return console.error("bad state for unitSideInfo");
        }
        if (!isUnitPhase(side, phase)) {
          alert("Not your turn yet");
          return;
        }
        if (targetRecord.currentTurn >= currentTurn) {
          alert("The unit has finished its turn");
          return;
        }
        // Doesn't have a unit on the position
        const unitRecord = battleLocationInfo([x, y]);
        if (unitRecord == null || unitRecord === targetRecord) {
          //  Move the unit
          targetRecord?.name != null &&
            moveUnitAction(targetRecord?.name, [x, y]);
          setMapAction((prevRecord) =>
            BattleMapActionRecord({
              actionMode: ActionModes.IN_ACTION,
              actionTargetLocation: [x, y],
              actionTargetInitialLocation:
                prevRecord.actionTargetInitialLocation,
            })
          );
        } else {
          alert("Can't move to that field");
          return;
        }
      } else {
        resetMapAction();
      }
    },
    [
      actionTargetLocation,
      battleLocationInfo,
      currentTurn,
      map.width,
      mapState,
      moveUnitAction,
      phase,
      resetMapAction,
      setMapAction,
      unitSideInfo,
    ]
  );
  const onInActionModeClick = React.useCallback(
    ([x, y]: LocationType) => {
      const isAttackArea =
        mapState.get(x + y * map.width) === TileStates.SHOW_ATTACK;
      if (isAttackArea) {
        if (actionTargetLocation == null) {
          return console.error("bad state for mapAction target");
        }
        const actionTargetRecord = battleLocationInfo(actionTargetLocation);
        const unitRecord = battleLocationInfo([x, y]);
        if (actionTargetRecord == null) {
          return console.error("bad state for battleLocationInfo");
        }
        if (unitRecord == null) {
          alert("No unit there");
          return;
        }
        const actionTargetSide = unitSideInfo(actionTargetRecord.name);
        const unitSide = unitSideInfo(unitRecord.name);
        if (unitSide !== actionTargetSide) {
          attackUnitAction(actionTargetRecord.name, unitRecord.name);
          resetMapAction();
          endUnitPhaseAction(actionTargetRecord.name);
        } else {
          alert("It is not an enemy");
        }
      } else {
        alert("It is not in the range of attack");
      }
    },
    [
      actionTargetLocation,
      attackUnitAction,
      battleLocationInfo,
      endUnitPhaseAction,
      map.width,
      mapState,
      resetMapAction,
      unitSideInfo,
    ]
  );
  const onTileComponentClick = React.useCallback(
    (location: LocationType) => {
      switch (actionMode) {
        case ActionModes.EMPTY:
          onEmptyModeClick(location);
          break;
        case ActionModes.IN_MOVE:
          onInMoveModeClick(location);
          break;
        case ActionModes.IN_ACTION:
          onInActionModeClick(location);
          break;
      }
    },
    [actionMode, onEmptyModeClick, onInActionModeClick, onInMoveModeClick]
  );

  const endTurn = React.useCallback(() => {
    resetMapAction();
    endTurnAction();
  }, [endTurnAction, resetMapAction]);
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
  const cancelPhase = React.useCallback(() => {
    resetMapAction();

    if (actionTargetLocation == null) {
      return console.error("bad state for mapAction target");
    }
    const targetRecord = battleLocationInfo(actionTargetLocation);
    targetRecord?.name &&
      actionTargetInitialLocation &&
      moveUnitAction(targetRecord?.name, actionTargetInitialLocation);
  }, [
    actionTargetInitialLocation,
    actionTargetLocation,
    battleLocationInfo,
    moveUnitAction,
    resetMapAction,
  ]);

  return (
    <div>
      <h1>Battle</h1>
      <h2>Max turn: {maxTurn}</h2>
      <h2>
        Turn {currentTurn}: {getPhaseDescription(phase)}
      </h2>
      <h2>Weather: {weather}</h2>
      <button onClick={endTurn}>End Turn</button>
      {actionMode === ActionModes.IN_ACTION && (
        <div className={css(styles.unitActionSection)}>
          <h2>Unit Actions</h2>
          <button onClick={endPhase}>End Phase</button>
          <button onClick={cancelPhase}>Cancel</button>
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
      {endTurnDialog}
    </div>
  );
}

export default Battle;

const styles = StyleSheet.create({
  unitActionSection: {
    float: "right",
  },
  row: {
    height: 100,
  },
});
