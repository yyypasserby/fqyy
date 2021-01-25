import { Map, Record, RecordOf } from "immutable";
import { UnitRecordType } from "./UnitRecord";

const WeatherTypes = ["sunny", "rainy", "windy", "snowy"] as const;

export type WeatherType = typeof WeatherTypes[number];

export type BattleType = {
  weather: WeatherType;
  ourUnits: Map<string, UnitRecordType>;
  enemyUnits: Map<string, UnitRecordType>;
};

export type BattleRecordType = RecordOf<BattleType>;

export const BattleRecord = Record<BattleType>({
  weather: "sunny",
  ourUnits: Map<string, UnitRecordType>(),
  enemyUnits: Map<string, UnitRecordType>(),
});
