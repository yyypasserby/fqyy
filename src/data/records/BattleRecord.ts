import { List, Record, RecordOf } from "immutable";
import { BattleMap } from "../utils/BattleMap";
import { UnitRecordType } from "./UnitRecord";

export const WeatherTypes = ["sunny", "rainy", "windy", "snowy"] as const;

export type WeatherType = typeof WeatherTypes[number];

export type BattleType = {
  weather: WeatherType;
  map: BattleMap;
  ourUnits: List<UnitRecordType>;
  enemyUnits: List<UnitRecordType>;
};

export type BattleRecordType = RecordOf<BattleType>;

export const BattleRecord = Record<BattleType>({
  weather: "sunny",
  map: BattleMap.random(100, 100),
  ourUnits: List<UnitRecordType>(),
  enemyUnits: List<UnitRecordType>(),
});
