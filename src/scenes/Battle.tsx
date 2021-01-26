import { css, StyleSheet } from "aphrodite";
import { List } from "immutable";
import React from "react";
import { useRecoilValue } from "recoil";
import TileComponent from "../components/TileComponent";
import { BattleAtom } from "../data/atoms/BattleAtom";
import { BattleLocationInfoSelector } from "../data/selectors/BattleLocationInfoSelector";
import { LocationType } from "../data/type/LocationType";
import { computeMovableLocations } from "../utils/computeMovableLocations";

export type TileStateType = "normal" | "showMove";
export type ActionModeType = "empty" | "InMove" | "InAction";

function Battle() {
  const { map } = useRecoilValue(BattleAtom);
  const battleLocationInfo = useRecoilValue(BattleLocationInfoSelector);

  const [mapState, setMapState] = React.useState(
    List<TileStateType>(
      map.tiles.flatMap((i) => new Array(i.length).fill("normal"))
    )
  );
  const [action, setAction] = React.useState<[ActionModeType, LocationType]>([
    "empty",
    [0, 0],
  ]);

  const setBatchMapState = React.useCallback(
    (locations: LocationType[], tileState: TileStateType) => {
      setMapState((prev) => {
        return prev.withMutations((mutable) => {
          locations.forEach(([locX, locY]) => {
            mutable.set(locX + locY * map.width, "showMove");
          });
        });
      });
    },
    [map.width]
  );

  const onOurUnitClick = React.useCallback(
    ([locX, locY]) => {
      const unitRecord = battleLocationInfo(locX, locY);
      if (unitRecord == null) {
        return;
      }

      const [actionMode, actionTarget] = action;
      let nextActionMode = actionMode,
        nextActionTarget = actionTarget;
      if (actionMode === "empty") {
        nextActionMode = "InMove";
        nextActionTarget = [locX, locY];
      }

      setAction([nextActionMode, nextActionTarget]);
    },
    [action, battleLocationInfo]
  );
  const onNonOurUnitClick = React.useCallback(
    ([locX, locY]) => {
      const unitRecord = battleLocationInfo(locX, locY);
      if (unitRecord != null) {
        return;
      }

      const [actionMode, actionTarget] = action;
      let nextActionMode = actionMode,
        nextActionTarget = actionTarget;

      if (actionMode === "InMove") {
        nextActionMode = "empty";
        nextActionTarget = [0, 0];
      }

      setAction([nextActionMode, nextActionTarget]);
    },
    [action, battleLocationInfo]
  );
  const onTileComponentClick = React.useCallback(
    ([locX, locY]) => {
      onOurUnitClick([locX, locY]);
      onNonOurUnitClick([locX, locY]);
    },
    [onNonOurUnitClick, onOurUnitClick]
  );

  React.useEffect(() => {
    const [actionMode, actionTarget] = action;
    switch (actionMode) {
      case "InMove":
        const [x, y] = actionTarget;
        const unitRecord = battleLocationInfo(x, y);
        setBatchMapState(
          computeMovableLocations(
            actionTarget,
            unitRecord?.move ?? 1,
            map.height,
            map.width
          ),
          "showMove"
        );
        break;
      case "empty":
        const array = List(
          new Array<TileStateType>(map.height * map.width).fill("normal")
        );
        setMapState(array);
        break;
      default:
        break;
    }
  }, [action, battleLocationInfo, map.height, map.width, setBatchMapState]);

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
