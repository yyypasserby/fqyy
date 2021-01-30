import { List } from "immutable";
import { selectorFamily } from "recoil";
import { BattleAtom } from "../atoms/BattleAtom";
import { BattleUnitsKeyType } from "../records/BattleRecord";
import { UnitRecordType } from "../records/UnitRecord";

export const UnitListSelector = selectorFamily<
  List<UnitRecordType>,
  BattleUnitsKeyType
>({
  key: "UnitListSelector",
  get: (unitsKey) => ({ get }) => {
    const atom = get(BattleAtom);
    return atom[unitsKey];
  },
});
