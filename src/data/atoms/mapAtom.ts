import { atom } from "recoil";

type Location = [number, number];

const MAX_HEIGHT = 10;
const MAX_WIDTH = 10;

export function getMapIndex(location: Location): number {
  return location[0] + location[1] * MAX_WIDTH;
}

const TileTypes = [
  "grass",
  "jungle",
  "snow",
  "mountain",
  "peak",
  "indoor",
  "wall",
  "bridge",
  "river",
] as const;

type TileType = typeof TileTypes[number];

const TileColorMap = new Map<TileType, string>([
  ["grass", "green"],
  ["jungle", "deep green"],
  ["snow", "white"],
  ["mountain", "brown"],
  ["peak", "gray"],
  ["indoor", "light yellow"],
  ["wall", "yellow"],
  ["bridge", "deep brown"],
  ["river", "blue"],
]);

interface ITile {
  type: TileType;
}

class Tile implements ITile {
  type: TileType;

  constructor(tileType: TileType) {
    this.type = tileType;
  }

  getColor(): string {
    return TileColorMap.get(this.type) ?? "red";
  }
}

function randomTile(): Tile {
  return new Tile(TileTypes[Math.floor(Math.random() * TileTypes.length)]);
}

function newMap(): Tile[][] {
  const ret = new Array<Array<Tile>>();

  for (let i = 0; i < MAX_HEIGHT; ++i) {
    const row = [];
    for (let j = 0; j < MAX_WIDTH; ++j) {
      row.push(randomTile());
    }
    ret.push(row);
  }
  return ret;
}

export const mapAtom = atom({
  key: "mapAtom",
  default: {
    height: MAX_HEIGHT,
    width: MAX_WIDTH,
    tiles: newMap(),
  },
});
