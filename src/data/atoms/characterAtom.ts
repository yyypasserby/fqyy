import { atom, RecoilState } from "recoil";

interface Character {
  name: string;
  level: number;
  potential: number;
  strength: number;
  agility: number;
  intelligence: number;
}

export const charaterAtom: RecoilState<Character[]> = atom({
  key: "characterAtom",
  default: [
    {
      name: "warrior",
      level: 1,
      potential: 0,
      strength: 1,
      agility: 1,
      intelligence: 1,
    },
    {
      name: "theif",
      level: 1,
      potential: 0,
      strength: 1,
      agility: 1,
      intelligence: 1,
    },
    {
      name: "mage",
      level: 1,
      potential: 0,
      strength: 1,
      agility: 1,
      intelligence: 1,
    },
  ],
});
