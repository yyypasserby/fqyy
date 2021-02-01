export const Phases = {
  OUR_PHASE: "OUR_PHASE",
  ENEMY_PHASE: "ENEMY_PHASE",
} as const;

export type PhaseType = keyof typeof Phases;
