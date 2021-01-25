import { randomChoice } from "./randomChoice";

export const TileTypes = ["grass", "jungle", "pond", "mountain"] as const;

export type TileType = typeof TileTypes[number];

const TileColorMapper = new Map<TileType, string>([
  ["grass", "mediumspringgreen"],
  ["jungle", "darkgreen"],
  ["pond", "lightblue"],
  ["mountain", "tan"],
]);

export class Tile {
  type: TileType;

  constructor(tileType: TileType) {
    this.type = tileType;
  }

  getColor(): string {
    return TileColorMapper.get(this.type) ?? "red";
  }

  static random(): Tile {
    return new Tile(randomChoice(TileTypes));
  }
}
