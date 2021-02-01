import { Phases, PhaseType } from "../data/type/Phases";
import { UnitSides, UnitSideType } from "../data/type/UnitSides";

export function isUnitPhase(unitSide: UnitSideType, phase: PhaseType): boolean {
  return (
    (unitSide === UnitSides.OUR_SIDE && phase === Phases.OUR_PHASE) ||
    (unitSide === UnitSides.ENEMY_SIDE && phase === Phases.ENEMY_PHASE)
  );
}
