import { css, StyleSheet } from "aphrodite";
import React from "react";
import { useRecoilValue } from "recoil";

import { BattleAtom } from "../data/atoms/BattleAtom";
import { UnitRecordType } from "../data/records/UnitRecord";
import { UnitSideSelector } from "../data/selectors/UnitSideSelector";
import { Tile } from "../data/type/Tile";
import { TileStates, TileStateType } from "../data/type/TileStates";
import { UnitSides } from "../data/type/UnitSides";
import { UnitStates } from "../data/type/UnitStates";

type Props = {
  locX: number;
  locY: number;
  tile: Tile;
  tileState: TileStateType | undefined;
  onClick: () => void;
  unit: UnitRecordType | undefined;
};

function TileComponent({ locX, locY, onClick, tile, tileState, unit }: Props) {
  const { currentTurn } = useRecoilValue(BattleAtom);
  const [isHover, setIsHover] = React.useState<boolean>(false);
  const unitSideInfo = useRecoilValue(UnitSideSelector);

  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={css([
        styles.tile,
        StyleSheet.create({
          tileColor: {
            backgroundColor: tile.getColor(),
          },
        }).tileColor,
        tileState === TileStates.SHOW_ATTACK && styles.tileShowAttack,
        tileState === TileStates.SHOW_MOVE && styles.tileShowMove,
        isHover && styles.tileHover,
      ])}
    >
      {isHover && unit && (
        <span className={css(styles.unitInfo)}>
          <div>{unit.name}</div>
          <div>HP: {unit.hp}</div>
          <div>MP: {unit.mp}</div>
          <div>Attack: {unit.attack}</div>
          <div>Defense: {unit.defense}</div>
          <div>State: {unit.state}</div>
        </span>
      )}
      {unit && unit.state !== UnitStates.DEAD && (
        <span
          className={css([
            styles.circle,
            unitSideInfo(unit.name) === UnitSides.ENEMY_SIDE
              ? unit.currentTurn < currentTurn
                ? styles.enemyUnit
                : styles.enemyUnitFinish
              : unit.currentTurn < currentTurn
              ? styles.ourUnit
              : styles.ourUnitFinish,
          ])}
        ></span>
      )}
    </span>
  );
}

export default TileComponent;

const styles = StyleSheet.create({
  circle: {
    borderRadius: "50%",
    display: "inline-block",
    height: 100,
    width: 100,
  },
  enemyUnit: {
    background: "blue",
  },
  enemyUnitFinish: {
    background: "navy",
  },
  ourUnit: {
    background: "yellow",
  },
  ourUnitFinish: {
    background: "gold",
  },
  tile: {
    display: "inline-block",
    height: 100,
    position: "relative",
    width: 100,
  },
  tileHover: {
    boxShadow: "0 0 0 4px snow inset",
  },
  tileShowAttack: {
    backgroundColor: "red",
  },
  tileShowMove: {
    backgroundColor: "mediumblue",
  },
  unitInfo: {
    backgroundColor: "black",
    borderRadius: 6,
    bottom: 50,
    color: "white",
    height: 100,
    left: 100,
    position: "absolute",
    width: 120,
    zIndex: 1,
  },
});
