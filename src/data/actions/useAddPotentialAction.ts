import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { GameAtom } from "../atoms/GameAtom";
import { AbilityTypeKey } from "../records/CharacterRecord";

export function useAddPotentialAction(): (
  index: number,
  ability: AbilityTypeKey
) => void {
  const setGame = useSetRecoilState(GameAtom);
  return useCallback(
    (index: number, ability: AbilityTypeKey) => {
      setGame((game) => {
        return game.update("characterList", (list) => {
          return list.update(index, (character) => {
            return character.potential > 0
              ? character
                  .update(ability, (val) => val + 1)
                  .update("potential", (val) => val - 1)
              : character;
          });
        });
      });
    },
    [setGame]
  );
}
