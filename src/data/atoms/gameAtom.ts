import { Record } from "immutable";
import { atom } from "recoil";

export const GameRecord = Record<{ id: number; name: string }>({
  id: 0,
  name: "",
});

export const gameAtom = atom({
  key: "gameAtom",
  default: GameRecord({
    id: 1,
    name: "new game",
  }),
});
