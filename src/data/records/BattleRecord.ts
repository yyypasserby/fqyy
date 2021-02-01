import { List, Record, RecordOf } from "immutable";
import { BattleMap } from "../type/BattleMap";
import { Phases, PhaseType } from "../type/Phases";
import { Weathers, WeatherType } from "../type/Weathers";
import { UnitRecordType } from "./UnitRecord";

export type BattleUnitsType = {
  ourUnits: List<UnitRecordType>;
  enemyUnits: List<UnitRecordType>;
};

export type BattleUnitsKeyType = keyof BattleUnitsType;

export type BattleType = BattleUnitsType & {
  weather: WeatherType;
  map: BattleMap;
  currentTurn: number;
  maxTurn: number;
  phase: PhaseType;
};

export type BattleRecordType = RecordOf<BattleType>;

export const BattleRecord = Record<BattleType>({
  weather: Weathers.SUNNY,
  map: BattleMap.random(100, 100),
  ourUnits: List<UnitRecordType>(),
  enemyUnits: List<UnitRecordType>(),
  currentTurn: 1,
  maxTurn: 20,
  phase: Phases.OUR_PHASE,
});
