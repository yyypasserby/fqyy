import { List } from "immutable";
import { selector } from "recoil";

import { GameAtom } from "../atoms/GameAtom";

export type PathHistoryListType = List<number>;

export const PathHistoryListSelector = selector<PathHistoryListType>({
  get: ({ get }) => {
    const { pathHistoryList } = get(GameAtom);
    return pathHistoryList;
  },
  key: "PathHistoryListSelector",
});
