import { Record, RecordOf } from "immutable";

export type AbilityType = {
  agility: number;
  intelligence: number;
  strength: number;
};

export type AbilityTypeKey = keyof AbilityType;

export type CharacterType = AbilityType & {
  level: number;
  move: number;
  name: string;
  potential: number;
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
