import { List, Record, RecordOf } from "immutable";
import { BattleMap } from "../type/BattleMap";
import { UnitRecordType } from "./UnitRecord";

export const WeatherTypes = ["sunny", "rainy", "windy", "snowy"] as const;
export type WeatherType = typeof WeatherTypes[number];

export const PhaseTypes = ["ourPhase", "enemyPhase"] as const;
export type PhaseType = typeof PhaseTypes[number];

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
  weather: "sunny",
  map: BattleMap.random(100, 100),
  ourUnits: List<UnitRecordType>(),
  enemyUnits: List<UnitRecordType>(),
  currentTurn: 1,
  maxTurn: 20,
  phase: "ourPhase",
});
