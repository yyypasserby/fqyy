import { randomChoice } from "../../utils/randomChoice";
import { TileTypes, TileTypeType } from "./TileTypes";

const TileTypeColorMapper = new Map<TileTypeType, string>([
  [TileTypes.GRASS, "mediumspringgreen"],
  [TileTypes.JUNGLE, "darkgreen"],
  [TileTypes.POND, "lightblue"],
  [TileTypes.MOUNTAIN, "tan"],
]);

export class Tile {
  type: TileTypeType;

  constructor(tileType: TileTypeType) {
    this.type = tileType;
  }

  getColor(): string {
    return TileTypeColorMapper.get(this.type) ?? "red";
  }

  static random(): Tile {
    return new Tile(randomChoice(Object.keys(TileTypes)) as TileTypeType);
  }
}
