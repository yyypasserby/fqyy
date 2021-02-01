import { Phases, PhaseType } from "../data/type/Phases";

export function getPhaseDescription(phase: PhaseType): string {
  switch (phase) {
    case Phases.OUR_PHASE:
      return "Our Phase";
    case Phases.ENEMY_PHASE:
      return "Enemy Phase";
  }
}
