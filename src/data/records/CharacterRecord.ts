import { Record, RecordOf } from "immutable";

export type AbilityType = {
  strength: number;
  agility: number;
  intelligence: number;
};

export type AbilityTypeKey = keyof AbilityType;

export type CharacterType = AbilityType & {
  name: string;
  level: number;
  potential: number;
  move: number;
};

export type CharacterRecordType = RecordOf<CharacterType>;

export const CharacterRecord = Record<CharacterType>({
  name: "character",
  level: 1,
  potential: 10,
  strength: 1,
  agility: 1,
  intelligence: 1,
  move: 10,
});
