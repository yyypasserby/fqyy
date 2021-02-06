import { Record, RecordOf } from "immutable";

import { UnitStates, UnitStateType } from "../type/UnitStates";
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
  state: UnitStateType;
};

export type UnitRecordType = RecordOf<UnitType>;

export const UnitRecord = Record<UnitType>({
  attack: 10,
  character: CharacterRecord(),
  currentTurn: 0,
  defense: 6,
  hp: 100,
  locX: 0,
  locY: 0,
  move: 4,
  mp: 50,
  name: "Unit",
  state: UnitStates.HEALTHY,
});
