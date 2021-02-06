import { List, Record, RecordOf } from "immutable";

import { CharacterRecordType } from "./CharacterRecord";

export type GameType = {
  id: number;
  name: string;
  characterList: List<CharacterRecordType>;
  pathHistoryList: List<number>;
};

export type GameRecordType = RecordOf<GameType>;

export const GameRecord = Record<GameType>({
  characterList: List<CharacterRecordType>([]),
  id: 0,
  name: "",
  pathHistoryList: List<number>([]),
});
