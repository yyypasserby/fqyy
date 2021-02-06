import { List } from "immutable";
import { selector } from "recoil";

import { GameAtom } from "../atoms/GameAtom";
import { CharacterRecordType } from "../records/CharacterRecord";

export const CharacterListSelector = selector<List<CharacterRecordType>>({
  get: ({ get }) => {
    const { characterList } = get(GameAtom);
    return characterList;
  },
  key: "CharacterListSelector",
});
