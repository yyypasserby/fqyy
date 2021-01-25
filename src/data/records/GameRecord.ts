import { RecordOf, Record, List } from "immutable";
import { CharacterRecordType } from "./CharacterRecord";

export type GameType = {
  id: number;
  name: string;
  characterList: List<CharacterRecordType>;
  pathHistoryList: List<number>;
};

export type GameRecordType = RecordOf<GameType>;

export const GameRecord = Record<GameType>({
  id: 0,
  name: "",
  characterList: List<CharacterRecordType>([]),
  pathHistoryList: List<number>([]),
});
