export const TileTypes = {
  GRASS: "GRASS",
  JUNGLE: "JUNGLE",
  POND: "POND",
  MOUNTAIN: "MOUNTAIN",
} as const;

export type TileTypeType = keyof typeof TileTypes;
