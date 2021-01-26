import { Tile } from "./Tile";

export class BattleMap {
  height: number;
  width: number;
  tiles: Tile[][];

  constructor(height: number, width: number, tiles: Tile[][]) {
    this.height = height;
    this.width = width;
    this.tiles = new Array<Array<Tile>>();

    for (let i = 0; i < this.height; ++i) {
      const row = [];
      for (let j = 0; j < this.width; ++j) {
        row.push(tiles[i][j]);
      }
      this.tiles.push(row);
    }
  }

  static random(height: number, width: number): BattleMap {
    const tiles = new Array<Array<Tile>>();
    for (let i = 0; i < height; ++i) {
      const row = [];
      for (let j = 0; j < width; ++j) {
        row.push(Tile.random());
      }
      tiles.push(row);
    }

    return new BattleMap(height, width, tiles);
  }
}
