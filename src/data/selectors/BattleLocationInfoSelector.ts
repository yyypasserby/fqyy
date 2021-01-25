import { selector } from "recoil";
import { BattleAtom } from "../atoms/BattleAtom";
import { UnitRecordType } from "../records/UnitRecord";

export const BattleLocationInfoSelector = selector({
  key: "BattleLocationInfoSelector",
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

    return (x: number, y: number) => {
      return battleLocationInfo.get(getLocIndex(x, y));
    };
  },
});
