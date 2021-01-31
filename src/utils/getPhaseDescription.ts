import { PhaseType } from "../data/records/BattleRecord";

export function getPhaseDescription(phase: PhaseType): string {
  switch (phase) {
    case "ourPhase":
      return "Our Phase";
    case "enemyPhase":
      return "Enemy Phase";
  }
}
