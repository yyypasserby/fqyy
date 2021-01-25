import { css, StyleSheet } from "aphrodite";
import React from "react";
import { useRecoilValue } from "recoil";
import TileComponent from "../components/TileComponent";
import { MapAtom } from "../data/atoms/MapAtom";

function Battle() {
  const map = useRecoilValue(MapAtom);

  return (
    <div>
      <h1>Battle</h1>
      <div>
        {map.tiles.map((row, i) => (
          <div className={css(styles.row)} key={i}>
            {row.map((tile, j) => (
              <TileComponent key={j} tile={tile} />
            ))}
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
