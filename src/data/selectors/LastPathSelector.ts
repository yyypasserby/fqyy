import { selector } from "recoil";

import { PathHistoryListSelector } from "./PathHistoryListSelector";

export const LastPathSelector = selector<number | undefined>({
  get: ({ get }) => {
    const pathHistoryList = get(PathHistoryListSelector);
    const pathLength = pathHistoryList.size;
    const lastPath = pathHistoryList.get(pathLength - 1);
    return lastPath;
  },
  key: "LastPathSelector",
});
