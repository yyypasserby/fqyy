export const Phases = {
  ENEMY_PHASE: "ENEMY_PHASE",
  OUR_PHASE: "OUR_PHASE",
} as const;

export type PhaseType = keyof typeof Phases;
