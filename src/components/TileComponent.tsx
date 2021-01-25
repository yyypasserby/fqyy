import { css, StyleSheet } from "aphrodite";
import React from "react";
import { Tile } from "../data/utils/Tile";

type Props = {
  tile: Tile;
};

function TileComponent({ tile }: Props) {
  const [isHover, setIsHover] = React.useState<boolean>(false);

  return (
    <span
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={css([
        styles.tile,
        StyleSheet.create({
          tileColor: {
            backgroundColor: tile.getColor(),
          },
        }).tileColor,
        isHover && styles.tileHover,
      ])}
    >
      {tile.type}
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
});
