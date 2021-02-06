import { List } from "immutable";

export const TileStates = {
  NORMAL: "NORMAL",
  SHOW_ATTACK: "SHOW_ATTACK",
  SHOW_MOVE: "SHOW_MOVE",
} as const;

export type TileStateType = keyof typeof TileStates;

export type MapStateType = List<TileStateType>;
