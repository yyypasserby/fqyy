import { atom } from "recoil";
import { List, Record, RecordOf } from "immutable";

type Ability = {
  strength: number;
  agility: number;
  intelligence: number;
};

type Character = Ability & {
  name: string;
  level: number;
  potential: number;
};

export type AbilityKey = keyof Ability;

const CharacterRecord = Record<Character>({
  name: "character",
  level: 1,
  potential: 10,
  strength: 1,
  agility: 1,
  intelligence: 1,
});

type CharacterRecordType = RecordOf<Character>;

export const charaterAtom = atom({
  key: "characterAtom",
  default: List<CharacterRecordType>([
    CharacterRecord({
      name: "warrior",
      level: 1,
    }),
    CharacterRecord({
      name: "theif",
      level: 1,
    }),
    CharacterRecord({
      name: "mage",
      level: 1,
    }),
  ]),
});
