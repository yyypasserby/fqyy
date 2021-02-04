import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { GameAtom } from "../atoms/GameAtom";

export function useAddPathAction(): (item: number) => void {
  const setGame = useSetRecoilState(GameAtom);
  return useCallback(
    (item: number) => {
      setGame((game) => {
        return game.update("pathHistoryList", (list) => {
          return list.push(item);
        });
      });
    },
    [setGame]
  );
}
