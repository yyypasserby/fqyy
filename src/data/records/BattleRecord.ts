import { List, Record, RecordOf } from "immutable";

import { BattleMap } from "../type/BattleMap";
import { Phases, PhaseType } from "../type/Phases";
import { Weathers, WeatherType } from "../type/Weathers";
import { UnitRecordType } from "./UnitRecord";

export type BattleUnitsType = {
  enemyUnits: List<UnitRecordType>;
  ourUnits: List<UnitRecordType>;
};

export type BattleUnitsKeyType = keyof BattleUnitsType;

export type BattleType = BattleUnitsType & {
  currentTurn: number;
  map: BattleMap;
  maxTurn: number;
  phase: PhaseType;
  weather: WeatherType;
};

export type BattleRecordType = RecordOf<BattleType>;

export const BattleRecord = Record<BattleType>({
  currentTurn: 1,
  enemyUnits: List<UnitRecordType>(),
  map: BattleMap.random(100, 100),
  maxTurn: 20,
  ourUnits: List<UnitRecordType>(),
  phase: Phases.OUR_PHASE,
  weather: Weathers.SUNNY,
});
