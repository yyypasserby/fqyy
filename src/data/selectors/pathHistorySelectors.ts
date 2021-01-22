import { selector } from "recoil";
import { pathHistoryAtom } from "../atoms/pathHistoryAtom";

export const pathHistorySelector = selector({
  key: "pathHistorySelector",
  get: ({ get }) => {
    const pathHistory = get(pathHistoryAtom);
    const pathLength = pathHistory.length;
    const lastPath = pathHistory[pathLength - 1];
    return {
      pathLength,
      lastPath,
    };
  },
});
