import { List } from "immutable";

export type TileStateType = "normal" | "showMove" | "showAttack";
export type MapStateType = List<TileStateType>;
