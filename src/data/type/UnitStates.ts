export const UnitStates = {
  DEAD: "DEAD",
  HEALTHY: "HEALTHY",
} as const;

export type UnitStateType = keyof typeof UnitStates;
