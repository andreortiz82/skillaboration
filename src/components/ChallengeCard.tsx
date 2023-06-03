import React, { useEffect, useState } from "react";
import { DiceThree } from "phosphor-react";
import _ from "lodash";

interface ChallengeCardProps {
  players: any[];
  skill: any[];
  challenge: any[];
}

export const ChallengeCard = ({ players, skills, challenges }) => {
  const [allPlayers, setAllPlayers] = useState(players);
  const [allSkills, setAllSkills] = useState(skills);
  const [allChallenges, setAllChallenges] = useState(challenges);

  const [skillaborators, setSkillaborators] = useState(null);
  const [roundChallenge, setRoundChallenge] = useState(null);
  const [roundSkill, setRoundSkill] = useState(null);
  const [roundDescription, setRoundDescription] = useState(null);

  // useEffect(() => {}, []);

  const chooseNames = () => {
    setSkillaborators(_.sampleSize(allPlayers, 3));
    setRoundChallenge(_.sampleSize(allChallenges, 1));
    setRoundSkill(_.sampleSize(allSkills, 1));
    setRoundDescription(`Design ${roundSkill} for ${roundChallenge}`);
  };

  return (
    <article>
      <header className="mb-5 flex gap-6 items-center">
        <h1 className="text-2xl font-bold">Skillaboration!</h1>
        <button
          className="flex gap-2 items-center text-lg px-4 py-2 cursor-pointer rounded-md bg-green-300 hover:bg-green-400 ease-in-out duration-200"
          onClick={() => chooseNames()}
        >
          <DiceThree className="text-2xl" /> <span>Roll to play</span>
        </button>
      </header>

      <section className="mb-5">
        {skillaborators?.length > 0 && (
          <h1 className="text-8xl font-bold">{roundDescription}</h1>
        )}
      </section>
      <section>
        {skillaborators?.length > 0 && <b>Skillaborators:</b>}
        <ul>
          {skillaborators?.map((p) => {
            return <li key={p}>{p}</li>;
          })}
        </ul>
      </section>
    </article>
  );
};
