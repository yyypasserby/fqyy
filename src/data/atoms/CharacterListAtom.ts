import { atom } from "recoil";
import { List } from "immutable";
import {
  CharacterRecord,
  CharacterRecordType,
} from "../records/CharacterRecord";

export const CharaterListAtom = atom({
  key: "CharacterListAtom",
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
