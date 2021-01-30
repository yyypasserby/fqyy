import React from "react";
import { useRecoilValue } from "recoil";
import { useAddPotentialAction } from "../data/atomActionHooks/GameAtomHooks";
import { CharacterListSelector } from "../data/selectors/CharacterListSelector";

function Stats() {
  const characters = useRecoilValue(CharacterListSelector);
  const addPotential = useAddPotentialAction();

  return (
    <div>
      <h1>Stats</h1>
      {characters.map((character, index) => {
        return (
          <div key={character.name}>
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
