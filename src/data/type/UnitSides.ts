export const UnitSides = {
  OUR_SIDE: "OUR_SIDE",
  ENEMY_SIDE: "ENEMY_SIDE",
} as const;

export type UnitSideType = keyof typeof UnitSides;
