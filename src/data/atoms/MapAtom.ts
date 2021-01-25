import { atom } from "recoil";
import { Tile } from "../utils/Tile";

const MAX_HEIGHT = 10;
const MAX_WIDTH = 10;

function newMap(): Tile[][] {
  const ret = new Array<Array<Tile>>();
  for (let i = 0; i < MAX_HEIGHT; ++i) {
    const row = [];
    for (let j = 0; j < MAX_WIDTH; ++j) {
      row.push(Tile.randomTile());
    }
    ret.push(row);
  }
  return ret;
}

export const MapAtom = atom({
  key: "MapAtom",
  default: {
    height: MAX_HEIGHT,
    width: MAX_WIDTH,
    tiles: newMap(),
  },
});
