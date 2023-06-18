import React, { useEffect, useState } from "react";
import _ from "lodash";
import uniqid from "uniqid";
import Confetti from "react-confetti";
import { ChallengeDescription } from "./ChallengeDescription";
import { ChallengeHeader } from "./ChallengeHeader";
import { Players } from "./Players";
import { checkAuth } from "../firebase/client";

interface ChallengeCardProps {
  skills: string[];
  challenges: string[];
}

export const ChallengeCard = (props: ChallengeCardProps) => {
  const { skills, challenges } = props;
  const [currentUser, setCurrentUser] = useState(null);
  const [players, setPlayers] = useState([]);
  const [gameUrl, setGameUrl] = useState("");
  const [playerLocked, setPlayerLocked] = useState(false);
  const [challengeLocked, setChallengeLocked] = useState(false);
  const [party, setParty] = useState(false);
  const [skillaborators, setSkillaborators] = useState([]);
  const [roundChallenge, setRoundChallenge] = useState(
    _.sampleSize(challenges, 1)
  );
  const [roundSkill, setRoundSkill] = useState(_.sampleSize(skills, 1));
  const [roundDescription, setRoundDescription] = useState("");
  const url = new URL(window.location.href);

  const delayRate = (index: any) => {
    const options = ["delay-0", "delay-1000", "delay-0"];
    return options[index];
  };

  const addTeammate = () => {
    const playerName: any = prompt("Enter a player name:");
    if (playerName !== null) {
      const tempPlayerSet: any = [...players, playerName];
      setPlayers(tempPlayerSet);
      url.searchParams.set("players", tempPlayerSet.join(","));
      window.history.replaceState(null, "", url.toString());
      setGameUrl(url.toString());
    }
  };

  useEffect(() => {
    checkAuth(setCurrentUser, (user: any) => {
      if (user !== null) {
        const tempPlayerSet: any = [...players, user["displayName"]];
        setPlayers(tempPlayerSet);
        url.searchParams.set("players", tempPlayerSet.join(","));
        window.history.replaceState(null, "", url.toString());
        setGameUrl(url.toString());
      }
    });

    const urlParams = new URL(window.location).searchParams;
    const urlPlayers = urlParams.get("players");
    const urlSkillabs = urlParams.get("skillaborators");
    const urlChallenge = urlParams.get("challenge");
    const initPlayers: any = urlPlayers?.split(",");
    const initSkillabs: any = urlSkillabs?.split(",");

    if (initPlayers?.length > 0) setPlayers(initPlayers);
    if (initSkillabs?.length > 0) setSkillaborators(initSkillabs);
    if (urlChallenge !== null) {
      setRoundDescription(urlChallenge);
    } else {
      const randomChallenge = _.sampleSize(challenges, 1);
      const randomSkill = _.sampleSize(skills, 1);
      setRoundDescription(`Design ${randomSkill} for ${randomChallenge}`);
    }
  }, []);

  const rollDice = () => {
    const randomPlayers: any = _.sampleSize(players, 3);
    const randomChallenge: any = _.sampleSize(challenges, 1);
    const randomSkill: any = _.sampleSize(skills, 1);
    setParty(true);

    url.searchParams.set("skillaborators", randomPlayers.join(","));
    url.searchParams.set(
      "challenge",
      `Design ${randomSkill} for ${randomChallenge}`
    );
    window.history.replaceState(null, "", url.toString());
    setGameUrl(url.toString());

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
    setParty(false);
    setPlayerLocked(false);
    setSkillaborators([]);

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
        numberOfPieces={100}
        recycle={false}
        tweenDuration={2000}
      />
    );
  };

  return (
    <section>
      <ChallengeHeader
        party={party}
        rollDice={rollDice}
        skillaborators={skillaborators}
        resetRound={resetRound}
        room={gameUrl}
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
      />
      <article>
        <>
          {runParty()}

          <ChallengeDescription
            challengeLocked={challengeLocked}
            roundDescription={roundDescription}
            setChallengeLocked={setChallengeLocked}
          />

          <hr className="my-10" />

          <Players
            playerLocked={playerLocked}
            setPlayerLocked={setPlayerLocked}
            players={players}
            skillaborators={skillaborators}
            party={party}
            addTeammate={addTeammate}
            delayRate={delayRate}
          />
        </>
      </article>
    </section>
  );
};
