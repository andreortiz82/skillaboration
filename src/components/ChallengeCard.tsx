import React, { useEffect, useState } from "react";
import { DiceThree } from "phosphor-react";
import { HowToPlay } from "./HowToPlay";
import _ from "lodash";
import Confetti from "react-confetti";

interface ChallengeCardProps {
  players: any[];
  skills: any[];
  challenges: any[];
}

export const ChallengeCard = (props: ChallengeCardProps) => {
  const { players, skills, challenges } = props;
  const tempRoundDescription = "How to play...";

  const [party, setParty] = useState(false);
  const [skillaborators, setSkillaborators] = useState(null);
  const [roundChallenge, setRoundChallenge] = useState(null);
  const [roundSkill, setRoundSkill] = useState(null);
  const [roundDescription, setRoundDescription] =
    useState(tempRoundDescription);

  // useEffect(() => {}, []);

  const rollDice = () => {
    const randomPlayers = _.sampleSize(players, 3);
    const randomChallenge = _.sampleSize(challenges, 1);
    const randomSkill = _.sampleSize(skills, 1);

    setParty(true);
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
    setParty(false);
  };

  const runParty = () => {
    return (
      <Confetti
        onConfettiComplete={(confetti) => {
          confetti?.reset();
          setParty(false);
        }}
        width={window.innerWidth}
        run={party}
        height={window.innerHeight}
        numberOfPieces={200}
        recycle={false}
      />
    );
  };

  return (
    <article>
      <header className="mb-5 flex gap-6 items-center">
        <h1 className="text-2xl font-bold">Skillaboration!</h1>
        <button
          disabled={party}
          className={`${
            party !== true ? "" : "animate-pulse cursor-not-allowed"
          } flex gap-2 items-center text-lg px-4 py-2 cursor-pointer rounded-md bg-green-300 hover:bg-green-400 ease-in-out duration-200`}
          onClick={() => party !== true && rollDice()}
        >
          <DiceThree
            className={`${party !== true ? "" : "animate-spin"} text-2xl`}
          />{" "}
          <span>{party !== true ? "Roll" : "Rolling..."}</span>
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
            {runParty()}
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
