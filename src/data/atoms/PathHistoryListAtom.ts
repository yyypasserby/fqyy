import { List } from "immutable";
import { atom } from "recoil";

export const PathHistoryListAtom = atom({
  key: "PathHistoryListAtom",
  default: List<number>([0]),
});
