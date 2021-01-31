import { Record, RecordOf } from "immutable";
import { LocationType } from "../type/LocationType";
export type ActionModeType = "empty" | "InMove" | "InAction";

export type BattleMapActionType = {
  actionMode: ActionModeType;
  actionTargetLocation: LocationType | null;
};

export type BattleMapActionRecordType = RecordOf<BattleMapActionType>;

export const BattleMapActionRecord = Record<BattleMapActionType>({
  actionMode: "empty",
  actionTargetLocation: null,
});
