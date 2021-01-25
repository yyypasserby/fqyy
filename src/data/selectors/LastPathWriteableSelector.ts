import { DefaultValue, selector } from "recoil";
import { GameAtom } from "../atoms/GameAtom";
import { PathHistoryListSelector } from "./PathHistoryListSelector";

export const LastPathWriteableSelector = selector<number | undefined>({
  key: "LastPathWriteableSelector",
  get: ({ get }) => {
    const pathHistoryList = get(PathHistoryListSelector);
    const pathLength = pathHistoryList.size;
    const lastPath = pathHistoryList.get(pathLength - 1);
    return lastPath;
  },
  set: ({ set }, newValue) => {
    set(GameAtom, (prev) => {
      return newValue instanceof DefaultValue
        ? newValue
        : prev.update("pathHistoryList", (pathHistoryList) => {
            return newValue ? pathHistoryList.push(newValue) : pathHistoryList;
          });
    });
  },
});
