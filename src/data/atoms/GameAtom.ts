import { List } from "immutable";
import { atom } from "recoil";
import {
  CharacterRecord,
  CharacterRecordType,
} from "../records/CharacterRecord";
import { GameRecord } from "../records/GameRecord";

export const GameAtom = atom({
  key: "GameAtom",
  default: GameRecord({
    id: 0,
    name: "new game",
    characterList: List<CharacterRecordType>([
      CharacterRecord({
        name: "warrior",
        level: 1,
        strength: 100,
      }),
      // CharacterRecord({
      //   name: "theif",
      //   level: 1,
      // }),
      // CharacterRecord({
      //   name: "mage",
      //   level: 1,
      // }),
    ]),
    pathHistoryList: List<number>([]),
  }),
});
