import { selectorFamily } from "recoil";

import { BattleAtom } from "../atoms/BattleAtom";
import { UnitRecordType } from "../records/UnitRecord";

export const UnitSelector = selectorFamily<UnitRecordType | undefined, string>({
  get: (unitName) => ({ get }) => {
    const { ourUnits, enemyUnits } = get(BattleAtom);
    return (
      ourUnits.find((unit) => unit.name === unitName) ??
      enemyUnits.find((unit) => unit.name === unitName)
    );
  },
  key: "UnitSelector",
});
