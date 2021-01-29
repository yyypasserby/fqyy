import { List } from "immutable";
import { DefaultValue, selectorFamily } from "recoil";
import { BattleAtom } from "../atoms/BattleAtom";
import { BattleUnitsKeyType } from "../records/BattleRecord";
import { UnitRecordType } from "../records/UnitRecord";

export const UnitsWriteableSelector = selectorFamily<
  List<UnitRecordType>,
  BattleUnitsKeyType
>({
  key: "UnitsWriteableSelector",
  get: (unitsKey) => ({ get }) => {
    const atom = get(BattleAtom);
    return atom[unitsKey];
  },
  set: (unitsKey) => ({ set }, newValue) => {
    set(BattleAtom, (prev) => {
      return newValue instanceof DefaultValue
        ? newValue
        : prev.set(unitsKey, newValue);
    });
  },
});
