import { selector } from "recoil";

import { BattleAtom } from "../atoms/BattleAtom";
import { UnitRecordType } from "../records/UnitRecord";
import { LocationType } from "../type/LocationType";

export const BattleLocationInfoSelector = selector({
  get: ({ get }) => {
    const battleRecord = get(BattleAtom);
    const battleLocationInfo = new Map<number, UnitRecordType>();

    function getLocIndex(x: number, y: number): number {
      return x + y * battleRecord.map.width;
    }

    const { ourUnits, enemyUnits } = battleRecord;
    ourUnits.forEach((unit) => {
      battleLocationInfo.set(getLocIndex(unit.locX, unit.locY), unit);
    });
    enemyUnits.forEach((unit) => {
      battleLocationInfo.set(getLocIndex(unit.locX, unit.locY), unit);
    });

    return ([x, y]: LocationType) => {
      return battleLocationInfo.get(getLocIndex(x, y));
    };
  },
  key: "BattleLocationInfoSelector",
});
