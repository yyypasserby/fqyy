import { Record, RecordOf } from "immutable";
import { CharacterRecord, CharacterRecordType } from "./CharacterRecord";

export type UnitType = {
  name: string;
  character: CharacterRecordType;
  hp: number;
  mp: number;
  attack: number;
  defense: number;
  move: number;
  locX: number; // Width
  locY: number; // Height
  currentTurn: number; // The turn that the unit has finished its action
};

export type UnitRecordType = RecordOf<UnitType>;

export const UnitRecord = Record<UnitType>({
  character: CharacterRecord(),
  name: "Unit",
  hp: 100,
  mp: 50,
  attack: 10,
  defense: 6,
  locX: 0,
  locY: 0,
  move: 4,
  currentTurn: 0,
});
