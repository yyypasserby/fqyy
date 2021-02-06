export const TileTypes = {
  GRASS: "GRASS",
  JUNGLE: "JUNGLE",
  MOUNTAIN: "MOUNTAIN",
  POND: "POND",
} as const;

export type TileTypeType = keyof typeof TileTypes;
