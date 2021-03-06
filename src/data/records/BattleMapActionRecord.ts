import { Record, RecordOf } from "immutable";

import { ActionModes, ActionModeType } from "../type/ActionModes";
import { LocationType } from "../type/LocationType";

export type BattleMapActionType = {
  actionMode: ActionModeType;
  actionTargetInitialLocation: LocationType | null;
  actionTargetLocation: LocationType | null;
};

export type BattleMapActionRecordType = RecordOf<BattleMapActionType>;

export const BattleMapActionRecord = Record<BattleMapActionType>({
  actionMode: ActionModes.EMPTY,
  actionTargetInitialLocation: null,
  actionTargetLocation: null,
});
