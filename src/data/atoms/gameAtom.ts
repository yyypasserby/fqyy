import { atom } from "recoil";

export const gameState = atom({
  key: "gameState",
  default: {
    id: 1,
    name: "new game",
  },
});
