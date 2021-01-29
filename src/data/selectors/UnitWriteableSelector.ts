import { DefaultValue, selectorFamily } from "recoil";
import { BattleAtom } from "../atoms/BattleAtom";
import { UnitRecordType } from "../records/UnitRecord";

export const UnitWriteableSelector = selectorFamily<
  UnitRecordType | undefined,
  string
>({
  key: "UnitWriteableSelector",
  get: (unitName) => ({ get }) => {
    const { ourUnits, enemyUnits } = get(BattleAtom);
    return (
      ourUnits.find((unit) => unit.name === unitName) ??
      enemyUnits.find((unit) => unit.name === unitName)
    );
  },
  set: (unitName) => ({ set }, newValue) => {
    set(BattleAtom, (prev) => {
      return newValue instanceof DefaultValue
        ? newValue
        : prev.withMutations((mutable) => {
            const { enemyUnits, ourUnits } = mutable;
            const enemyUnitIndex = enemyUnits.findIndex(
              (unit) => unit.name === unitName
            );
            if (enemyUnitIndex !== -1 && newValue) {
              mutable.set(
                "enemyUnits",
                enemyUnits.set(enemyUnitIndex, newValue)
              );
            }

            const ourUnitIndex = ourUnits.findIndex(
              (unit) => unit.name === unitName
            );
            if (ourUnitIndex !== -1 && newValue) {
              mutable.set("ourUnits", ourUnits.set(ourUnitIndex, newValue));
            }
          });
    });
  },
});
