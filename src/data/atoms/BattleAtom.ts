import { atom } from "recoil";
import { BattleRecord, BattleRecordType } from "../records/BattleRecord";

export const BattleAtom = atom<BattleRecordType>({
  key: "BattleAtom",
  default: BattleRecord(),
});
