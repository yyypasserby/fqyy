export const UnitSides = {
  ENEMY_SIDE: "ENEMY_SIDE",
  OUR_SIDE: "OUR_SIDE",
} as const;

export type UnitSideType = keyof typeof UnitSides;
