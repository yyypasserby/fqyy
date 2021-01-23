import { selector } from "recoil";
import { pathHistoryAtom } from "../atoms/pathHistoryAtom";

export const pathHistorySelector = selector({
  key: "pathHistorySelector",
  get: ({ get }) => {
    const pathHistory = get(pathHistoryAtom);
    const pathLength = pathHistory.size;
    const lastPath = pathHistory.get(pathLength - 1);
    return {
      pathLength,
      lastPath,
    };
  },
});
