import { css, StyleSheet } from "aphrodite";
import React from "react";
import { useRecoilValue } from "recoil";
import { BattleAtom } from "../data/atoms/BattleAtom";
import { UnitRecordType } from "../data/records/UnitRecord";
import { UnitSideSelector } from "../data/selectors/UnitSideSelector";
import { Tile } from "../data/type/Tile";
import { TileStates, TileStateType } from "../data/type/TileStates";
import { UnitSides } from "../data/type/UnitSides";

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
      {unit && (
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
  tile: {
    height: 100,
    width: 100,
    display: "inline-block",
  },
  tileHover: {
    boxShadow: "0 0 0 4px snow inset",
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    display: "inline-block",
  },
  ourUnit: {
    background: "yellow",
  },
  ourUnitFinish: {
    background: "gold",
  },
  enemyUnit: {
    background: "blue",
  },
  enemyUnitFinish: {
    background: "navy",
  },
  tileShowMove: {
    backgroundColor: "mediumblue",
  },
  tileShowAttack: {
    backgroundColor: "red",
  },
});
