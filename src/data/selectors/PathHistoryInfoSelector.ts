import { selector } from "recoil";
import { PathHistoryListAtom } from "../atoms/PathHistoryListAtom";

export const PathHistoryInfoSelector = selector({
  key: "pathHistorySelector",
  get: ({ get }) => {
    const pathHistoryList = get(PathHistoryListAtom);
    const pathLength = pathHistoryList.size;
    const lastPath = pathHistoryList.get(pathLength - 1);
    return {
      pathLength,
      lastPath,
    };
  },
});
