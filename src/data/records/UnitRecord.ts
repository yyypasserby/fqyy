import { Record, RecordOf } from "immutable";

export type UnitType = {
  hp: number;
  mp: number;
  attack: number;
  defense: number;
};

export type UnitRecordType = RecordOf<UnitType>;

export const UnitRecord = Record<UnitType>({
  hp: 100,
  mp: 50,
  attack: 10,
  defense: 6,
});
