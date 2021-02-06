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
  agility: 1,
  intelligence: 1,
  level: 1,
  move: 10,
  name: "character",
  potential: 10,
  strength: 1,
});
