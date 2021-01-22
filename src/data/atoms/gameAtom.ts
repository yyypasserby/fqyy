import { atom } from "recoil";

export const gameAtom = atom({
  key: "gameAtom",
  default: {
    id: 1,
    name: "new game",
  },
});
