export const ActionModes = {
  EMPTY: "EMPTY",
  IN_ACTION: "IN_ACTION",
  IN_MOVE: "IN_MOVE",
} as const;

export type ActionModeType = keyof typeof ActionModes;
