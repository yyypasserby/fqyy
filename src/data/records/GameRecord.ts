import { RecordOf, Record } from "immutable";

export type GameType = {
  id: number;
  name: string;
};

export type GameRecordType = RecordOf<GameType>;

export const GameRecord = Record<GameType>({
  id: 0,
  name: "",
});
