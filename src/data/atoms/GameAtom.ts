import { atom } from "recoil";
import { GameRecord } from "../records/GameRecord";

export const GameAtom = atom({
  key: "GameAtom",
  default: GameRecord({
    id: 1,
    name: "new game",
  }),
});
