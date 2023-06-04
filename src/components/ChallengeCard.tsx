import React, { useEffect, useState } from "react";
import { DiceThree, Lock, LockOpen } from "phosphor-react";
import _ from "lodash";
import Confetti from "react-confetti";
import { HowToPlayPrompt } from "./HowToPlay";

interface ChallengeCardProps {
  players: any;
  skills: any;
  challenges: any;
}

export const ChallengeCard = (props: ChallengeCardProps) => {
  const { players, skills, challenges } = props;

  const [playerLocked, setPlayerLocked] = useState(false);
  const [challengeLocked, setChallengeLocked] = useState(false);
  const [party, setParty] = useState(false);
  const [skillaborators, setSkillaborators] = useState([]);
  const [roundChallenge, setRoundChallenge] = useState(
    _.sampleSize(challenges, 1)
  );
  const [roundSkill, setRoundSkill] = useState(_.sampleSize(skills, 1));
  const [roundDescription, setRoundDescription] = useState("");

  const delayRate = (index: any) => {
    const options = ["delay-0", "delay-1000", "delay-0"];
    return options[index];
  };

  useEffect(() => {
    const randomChallenge = _.sampleSize(challenges, 1);
    const randomSkill = _.sampleSize(skills, 1);
    setRoundDescription(`Design ${randomSkill} for ${randomChallenge}`);
  }, []);

  const rollDice = () => {
    const randomPlayers: any = _.sampleSize(players, 3);
    const randomChallenge: any = _.sampleSize(challenges, 1);
    const randomSkill: any = _.sampleSize(skills, 1);
    setParty(true);

    if (playerLocked === false) {
      setSkillaborators(randomPlayers);
    }

    if (challengeLocked === false) {
      setRoundChallenge(randomChallenge);
      setRoundSkill(randomSkill);
      setRoundDescription(`Design ${randomSkill} for ${randomChallenge}`);
    }
  };

  const resetRound = () => {
    setChallengeLocked(false);
    setPlayerLocked(false);
    setSkillaborators(null);
    setRoundChallenge(null);
    setRoundSkill(null);

    const randomChallenge = _.sampleSize(challenges, 1);
    const randomSkill = _.sampleSize(skills, 1);
    setRoundDescription(`Design ${randomSkill} for ${randomChallenge}`);
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

  const RoundControls = ({ type, locked }: any) => {
    return (
      <div className="flex gap-4 flex-col justify-center">
        <button
          onClick={() => {
            type === "player"
              ? setPlayerLocked(!locked)
              : setChallengeLocked(!locked);
          }}
          className="p-3 rounded-full cursor-pointer bg-white hover:bg-gray-200 ease-in-out duration-200"
        >
          {locked === true ? (
            <Lock className="text-3xl" />
          ) : (
            <LockOpen className="text-3xl" />
          )}
        </button>
      </div>
    );
  };

  return (
    <article>
      <header className="mb-5 flex justify-between">
        <div className="flex gap-6 items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Skillaboration!
          </h1>
          <div className="flex gap-3 items-center">
            <button
              disabled={party}
              className={`${
                party !== true
                  ? "cursor-pointer px-5"
                  : "cursor-not-allowed animate-colors px-3"
              } flex gap-2 border-neutral-950 border-2 items-center text-lg py-2 rounded-full bg-green-300 hover:bg-green-400 ease-in-out duration-200`}
              onClick={() => party !== true && rollDice()}
            >
              <DiceThree
                className={`${party !== true ? "" : "animate-spin"} text-3xl`}
              />{" "}
              {party !== true && <span>Roll to play</span>}
            </button>

            {skillaborators?.length > 0 && (
              <button
                className="flex gap-2 items-center text-lg px-4 py-3 rounded-full cursor-pointer bg-white hover:bg-gray-200 ease-in-out duration-200"
                onClick={() => resetRound()}
              >
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
        <HowToPlayPrompt />
      </header>

      <section>
        <>
          {runParty()}
          <header className="mb-5 flex gap-3">
            <RoundControls type="challenge" locked={challengeLocked} />
            <h1 className="flex text-8xl font-bold">{roundDescription}</h1>
          </header>

          {skillaborators?.length > 0 && (
            <div className="flex gap-3 mt-8">
              <RoundControls type="player" locked={playerLocked} />
              <div>
                <h2 className="text-4xl font-bold mb-4">Skillaborators:</h2>
                <ul className="flex gap-4">
                  {skillaborators?.map((player: any, index) => {
                    return (
                      <li key={player}>
                        <article className="flex flex-col items-center justify-center">
                          <div
                            className={`
                            ${delayRate(index)}
                            animate-players 
                            border-neutral-950 
                            border-4 
                            w-20 
                            h-20 
                            rounded-full 
                            overflow-hidden
                            transition
                            duration-300
                            flex
                            justify-center
                            items-center`}
                          >
                            <span className="uppercase text-2xl text-center">
                              {player.substring(0, 2)}
                            </span>
                          </div>
                          {player}
                        </article>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </>
      </section>
    </article>
  );
};
