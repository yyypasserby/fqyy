import { List, Record, RecordOf } from "immutable";

import { CharacterRecordType } from "./CharacterRecord";

export type GameType = {
  characterList: List<CharacterRecordType>;
  id: number;
  name: string;
  pathHistoryList: List<number>;
};

export type GameRecordType = RecordOf<GameType>;

export const GameRecord = Record<GameType>({
  characterList: List<CharacterRecordType>([]),
  id: 0,
  name: "",
  pathHistoryList: List<number>([]),
});
