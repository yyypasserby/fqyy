import { List } from "immutable";
import { DefaultValue, selector } from "recoil";
import { GameAtom } from "../atoms/GameAtom";
import { CharacterRecordType } from "../records/CharacterRecord";

export const CharacterListWriteableSelector = selector<
  List<CharacterRecordType>
>({
  key: "CharacterListWriteableSelector",
  get: ({ get }) => {
    const { characterList } = get(GameAtom);
    return characterList;
  },
  set: ({ set }, newValue) => {
    set(GameAtom, (prev) => {
      return newValue instanceof DefaultValue
        ? newValue
        : prev.set("characterList", newValue);
    });
  },
});
