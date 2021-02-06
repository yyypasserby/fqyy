import { List } from "immutable";
import { atom } from "recoil";

import {
  CharacterRecord,
  CharacterRecordType,
} from "../records/CharacterRecord";
import { GameRecord } from "../records/GameRecord";

export const GameAtom = atom({
  default: GameRecord({
    characterList: List<CharacterRecordType>([
      CharacterRecord({
        level: 1,
        name: "warrior",
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
    id: 0,
    name: "new game",
    pathHistoryList: List<number>([]),
  }),
  key: "GameAtom",
});
