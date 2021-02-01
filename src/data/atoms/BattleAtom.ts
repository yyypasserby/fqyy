import { atom, selector } from "recoil";
import { BattleRecord, BattleRecordType } from "../records/BattleRecord";
import { UnitRecord } from "../records/UnitRecord";
import { BattleMap } from "../type/BattleMap";
import { randomChoice } from "../../utils/randomChoice";
import { GameAtom } from "./GameAtom";
import { Phases } from "../type/Phases";
import { Weathers, WeatherType } from "../type/Weathers";

export const BATTLE_MAP_MAX_HEIGHT = 10;
export const BATTLE_MAP_MAX_WIDTH = 10;
export const BATTLE_MAX_TURN = 20;

export const BattleAtom = atom<BattleRecordType>({
  key: "BattleAtom",
  default: selector({
    key: "BattleAtomDefaultSelector",
    get: ({ get }) => {
      const { characterList } = get(GameAtom);
      const unitList = characterList.map((character, index) => {
        const { strength, agility, intelligence } = character;
        return UnitRecord({
          name: character.name,
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

      const enemyUnitList = characterList.map((character, index) => {
        const { strength, agility, intelligence } = character;
        return UnitRecord({
          name: "enemy " + character.name,
          hp: strength * 5 + 100,
          mp: intelligence * 2 + 20,
          attack: strength * 2 + 10,
          defense: agility * 2 + 5,
          locX: characterList.size - 1 - index,
          locY: 0,
          move: 4,
        });
      });

      return BattleRecord({
        weather: randomChoice(Object.keys(Weathers)) as WeatherType,
        map: BattleMap.random(BATTLE_MAP_MAX_HEIGHT, BATTLE_MAP_MAX_HEIGHT),
        ourUnits: unitList,
        enemyUnits: enemyUnitList,
        currentTurn: 1,
        maxTurn: BATTLE_MAX_TURN,
        phase: Phases.OUR_PHASE,
      });
    },
  }),
});
