export const UnitStates = {
  HEALTHY: "HEALTHY",
  DEAD: "DEAD",
} as const;

export type UnitStateType = keyof typeof UnitStates;
