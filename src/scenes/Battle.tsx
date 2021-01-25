import { css, StyleSheet } from "aphrodite";
import { List } from "immutable";
import React from "react";
import { useRecoilValue } from "recoil";
import TileComponent from "../components/TileComponent";
import { BattleAtom } from "../data/atoms/BattleAtom";
import { BattleLocationInfoSelector } from "../data/selectors/BattleLocationInfoSelector";

export type TileStateType = "normal" | "showMove";
export type LocationType = [number, number];

function Battle() {
  const { map } = useRecoilValue(BattleAtom);
  const battleLocationInfo = useRecoilValue(BattleLocationInfoSelector);
  const { width } = map;
  const [mapState, setMapState] = React.useState(
    List<TileStateType>(
      map.tiles.flatMap((i) => new Array(i.length).fill("normal"))
    )
  );
  const setBatchMapState = React.useCallback(
    (locations: LocationType[], tileState: TileStateType) => {
      for (const [x, y] of locations) {
        setMapState((prev) => {
          return prev.set(x + y * width, "showMove");
        });
      }
    },
    [width]
  );
  const onTileComponentClick = React.useCallback(() => {
    const movableArea = new Array<LocationType>();
    movableArea.push([0, 0]);
    setBatchMapState(movableArea, "showMove");
  }, [setBatchMapState]);

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
                  tileState={mapState.get(i * width + j)}
                  onClick={onTileComponentClick}
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
