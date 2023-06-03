import React, { useEffect, useState } from "react";
import { DiceThree } from "phosphor-react";
import { HowToPlay } from "./HowToPlay";
import _, { isNull } from "lodash";

interface ChallengeCardProps {
  players: any[];
  skills: any[];
  challenges: any[];
}

export const ChallengeCard = (props: ChallengeCardProps) => {
  const { players, skills, challenges } = props;
  const tempRoundDescription = "How to play...";

  const [skillaborators, setSkillaborators] = useState(null);
  const [roundChallenge, setRoundChallenge] = useState(null);
  const [roundSkill, setRoundSkill] = useState(null);
  const [roundDescription, setRoundDescription] =
    useState(tempRoundDescription);

  // useEffect(() => {}, []);

  const chooseNames = () => {
    const randomPlayers = _.sampleSize(players, 3);
    const randomChallenge = _.sampleSize(challenges, 1);
    const randomSkill = _.sampleSize(skills, 1);

    setSkillaborators(randomPlayers);
    setRoundChallenge(randomChallenge);
    setRoundSkill(randomSkill);
    setRoundDescription(`Design ${randomSkill} for ${randomChallenge}`);
  };

  const resetRound = () => {
    setSkillaborators(null);
    setRoundChallenge(null);
    setRoundSkill(null);
    setRoundDescription(tempRoundDescription);
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

        <button
          className="flex gap-2 items-center text-lg px-4 py-2 cursor-pointer rounded-md bg-white hover:bg-gray-200 ease-in-out duration-200"
          onClick={() => resetRound()}
        >
          <span>Reset</span>
        </button>
      </header>

      <section>
        {skillaborators?.length > 0 ? (
          <>
            <header className="mb-5">
              <h1 className="text-8xl font-bold">{roundDescription}</h1>
            </header>
            <b>Skillaborators:</b>
            <ul>
              {skillaborators?.map((p) => {
                return <li key={p}>{p}</li>;
              })}
            </ul>
          </>
        ) : (
          <>
            <HowToPlay />
            <b>Contestants:</b>
            <ul>
              {players.map((p) => {
                return <li key={p}>{p}</li>;
              })}
            </ul>
          </>
        )}
      </section>
    </article>
  );
};
