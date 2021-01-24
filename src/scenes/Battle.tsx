import { css, StyleSheet } from "aphrodite";
import { useRecoilValue } from "recoil";
import { mapAtom } from "../data/atoms/mapAtom";

function Battle() {
  const map = useRecoilValue(mapAtom);

  return (
    <div>
      <h1>Battle</h1>
      <div>
        {map.tiles.map((row, i) => (
          <div className={css(styles.row)} key={i}>
            {row.map((tile, j) => (
              <span
                className={css([
                  styles.tile,
                  StyleSheet.create({
                    tileColor: {
                      backgroundColor: tile.getColor(),
                    },
                  }).tileColor,
                ])}
                key={j}
              >
                {i + ", " + j + " - " + tile.type}
              </span>
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
  tile: {
    height: 100,
    width: 100,
    display: "inline-block",
  },
});
