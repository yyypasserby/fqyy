import { LocationType } from "../data/type/LocationType";

export function computeMovableLocations(
  [x, y]: LocationType,
  move: number,
  mapHeight: number,
  mapWidth: number
): LocationType[] {
  const locations = new Array<LocationType>();
  const dedup = new Set<number>();
  dfs(locations, dedup, mapHeight, mapWidth, x, y, move + 1);
  return locations;
}

function dfs(
  arr: LocationType[],
  dedup: Set<number>,
  mapHeight: number,
  mapWidth: number,
  locX: number,
  locY: number,
  move: number
): void {
  if (
    locX < 0 ||
    locX >= mapWidth ||
    locY < 0 ||
    locY >= mapHeight ||
    move === 0
  ) {
    return;
  }

  const index = locX + locY * mapWidth;
  if (!dedup.has(index)) {
    arr.push([locX, locY]);
    dedup.add(index);
  }

  dfs(arr, dedup, mapHeight, mapWidth, locX - 1, locY, move - 1);
  dfs(arr, dedup, mapHeight, mapWidth, locX + 1, locY, move - 1);
  dfs(arr, dedup, mapHeight, mapWidth, locX, locY - 1, move - 1);
  dfs(arr, dedup, mapHeight, mapWidth, locX, locY + 1, move - 1);
}
