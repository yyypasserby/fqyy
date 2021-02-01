export const ActionModes = {
  EMPTY: "EMPTY",
  IN_MOVE: "IN_MOVE",
  IN_ACTION: "IN_ACTION",
} as const;

export type ActionModeType = keyof typeof ActionModes;
