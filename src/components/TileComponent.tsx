import { css, StyleSheet } from "aphrodite";
import React from "react";
import { UnitRecordType } from "../data/records/UnitRecord";
import { Tile } from "../data/utils/Tile";
import { TileStateType } from "../scenes/Battle";

type Props = {
  locX: number;
  locY: number;
  tile: Tile;
  tileState: TileStateType | undefined;
  onClick: () => void;
  unit: UnitRecordType | undefined;
};

function TileComponent({ locX, locY, onClick, tile, tileState, unit }: Props) {
  const [isHover, setIsHover] = React.useState<boolean>(false);

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
        tileState === "showMove" && styles.tileShowMove,
        isHover && styles.tileHover,
      ])}
    >
      {unit && <span className={css(styles.circle)}></span>}
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
    background: "red",
    borderRadius: "50%",
    display: "inline-block",
  },
  tileShowMove: {
    backgroundColor: "mediumblue",
  },
});
