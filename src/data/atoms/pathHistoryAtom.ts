import { List } from "immutable";
import { atom } from "recoil";

export const pathHistoryAtom = atom({
  key: "pathHistoryAtom",
  default: List<number>([0]),
});
