import { useRecoilState } from "recoil";
import { charaterAtom } from "../data/atoms/characterAtom";

function Stats() {
  const [characters, setCharacters] = useRecoilState(charaterAtom);
  return (
    <div>
      <h1>Stats</h1>
      {characters.map((character) => {
        return (
          <div>
            <h2>Name: {character.name}</h2>
            <h3>Level: {character.level}</h3>
            <h3>Potential: {character.potential}</h3>
            <h3>Strength: {character.strength}</h3>
            <h3>Agility: {character.agility}</h3>
            <h3>Intelligence: {character.intelligence}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Stats;
