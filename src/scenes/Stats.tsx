import React from "react";
import { useRecoilState } from "recoil";
import { AbilityKey, charaterAtom } from "../data/atoms/characterAtom";

function Stats() {
  const [characters, setCharacters] = useRecoilState(charaterAtom);
  const addPotential = React.useCallback(
    (index, ability: AbilityKey) => {
      setCharacters(
        characters.update(index, (character) => {
          if (character.get("potential") > 0) {
            return character
              .update(ability, (val) => val + 1)
              .update("potential", (val) => val - 1);
          }
          return character;
        })
      );
    },
    [characters, setCharacters]
  );
  return (
    <div>
      <h1>Stats</h1>
      {characters.map((character, index) => {
        return (
          <div>
            <h2>Name: {character.name}</h2>
            <h3>Level: {character.level}</h3>
            <h3>Potential: {character.potential}</h3>
            <h3>
              Strength: {character.strength}
              <button onClick={() => addPotential(index, "strength")}>+</button>
            </h3>
            <h3>
              Agility: {character.agility}
              <button onClick={() => addPotential(index, "agility")}>+</button>
            </h3>
            <h3>
              Intelligence: {character.intelligence}
              <button onClick={() => addPotential(index, "intelligence")}>
                +
              </button>
            </h3>
          </div>
        );
      })}
    </div>
  );
}

export default Stats;
