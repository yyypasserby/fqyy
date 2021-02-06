import { selector } from "recoil";

import { BattleAtom } from "../atoms/BattleAtom";
import { UnitSides, UnitSideType } from "../type/UnitSides";

export const UnitSideSelector = selector<
  (unitName: string) => UnitSideType | null
>({
  get: ({ get }) => {
    const { ourUnits, enemyUnits } = get(BattleAtom);
    return (unitName: string) => {
      if (ourUnits.find((unit) => unit.name === unitName)) {
        return UnitSides.OUR_SIDE;
      } else if (enemyUnits.find((unit) => unit.name === unitName)) {
        return UnitSides.ENEMY_SIDE;
      }
      return null;
    };
  },
  key: "UnitSideSelector",
});
