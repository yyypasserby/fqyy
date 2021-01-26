import { List } from "immutable";
import { atom, selector } from "recoil";
import {
  BattleRecord,
  BattleRecordType,
  WeatherTypes,
} from "../records/BattleRecord";
import { UnitRecord, UnitRecordType } from "../records/UnitRecord";
import { BattleMap } from "../type/BattleMap";
import { randomChoice } from "../../utils/randomChoice";
import { GameAtom } from "./GameAtom";

export const BATTLE_MAP_MAX_HEIGHT = 10;
export const BATTLE_MAP_MAX_WIDTH = 10;

export const BattleAtom = atom<BattleRecordType>({
  key: "BattleAtom",
  default: selector({
    key: "BattleAtomDefaultSelector",
    get: ({ get }) => {
      const { characterList } = get(GameAtom);
      const unitList = characterList.map((character, index) => {
        const { strength, agility, intelligence } = character;
        return UnitRecord({
          character,
          hp: strength * 5 + 100,
          mp: intelligence * 2 + 20,
          attack: strength * 2 + 10,
          defense: agility * 2 + 5,
          locX: BATTLE_MAP_MAX_WIDTH - (characterList.size - index),
          locY: BATTLE_MAP_MAX_HEIGHT - 1,
          move: 4,
        });
      });

      return BattleRecord({
        weather: randomChoice(WeatherTypes),
        map: BattleMap.random(BATTLE_MAP_MAX_HEIGHT, BATTLE_MAP_MAX_HEIGHT),
        ourUnits: unitList,
        enemyUnits: List<UnitRecordType>(),
      });
    },
  }),
});
