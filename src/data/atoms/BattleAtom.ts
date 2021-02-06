import { atom, selector } from "recoil";

import { randomChoice } from "../../utils/randomChoice";
import { BattleRecord, BattleRecordType } from "../records/BattleRecord";
import { UnitRecord } from "../records/UnitRecord";
import { BattleMap } from "../type/BattleMap";
import { Phases } from "../type/Phases";
import { Weathers, WeatherType } from "../type/Weathers";
import { GameAtom } from "./GameAtom";

export const BATTLE_MAP_MAX_HEIGHT = 10;
export const BATTLE_MAP_MAX_WIDTH = 10;
export const BATTLE_MAX_TURN = 20;

export const BattleAtom = atom<BattleRecordType>({
  default: selector({
    get: ({ get }) => {
      const { characterList } = get(GameAtom);
      const unitList = characterList.map((character, index) => {
        const { strength, agility, intelligence, move } = character;
        return UnitRecord({
          attack: strength * 3 + 10,
          character,
          defense: agility * 2 + 5,
          hp: strength * 2 + 100,
          locX: BATTLE_MAP_MAX_WIDTH - (characterList.size - index),
          locY: BATTLE_MAP_MAX_HEIGHT - 1,
          move,
          mp: intelligence * 2 + 20,
          name: character.name,
        });
      });

      const enemyUnitList = characterList.map((character, index) => {
        const { strength, agility, intelligence, move } = character;
        return UnitRecord({
          attack: strength * 3 + 10,
          defense: agility * 2 + 5,
          hp: strength * 2 + 100,
          locX: characterList.size - 1 - index,
          locY: 0,
          move,
          mp: intelligence * 2 + 20,
          name: "enemy " + character.name,
        });
      });

      return BattleRecord({
        currentTurn: 1,
        enemyUnits: enemyUnitList,
        map: BattleMap.random(BATTLE_MAP_MAX_HEIGHT, BATTLE_MAP_MAX_HEIGHT),
        maxTurn: BATTLE_MAX_TURN,
        ourUnits: unitList,
        phase: Phases.OUR_PHASE,
        weather: randomChoice(Object.keys(Weathers)) as WeatherType,
      });
    },
    key: "BattleAtomDefaultSelector",
  }),
  key: "BattleAtom",
});
