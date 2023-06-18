import { HowToPlayPrompt } from "./HowToPlay";
import { DiceThree } from "phosphor-react";
import { UserControl } from "./UserControl";

export const ChallengeHeader = ({
  party,
  rollDice,
  skillaborators,
  resetRound,
  room,
  setCurrentUser,
  currentUser,
}: any) => {
  return (
    <header className="">
      <div className="flex flex-wrap gap-4 items-center mt-5 md:mt-0">
        <h1 className="font-lilita font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Skillaboration!
        </h1>
        <button
          className={`${
            party !== true ? "cursor-pointer" : "animate-colors"
          } button button--roll`}
          onClick={() => rollDice()}
        >
          <DiceThree
            className={`${party !== true ? "" : "animate-spin"} text-lg`}
          />{" "}
          <span>Roll to play</span>
        </button>

        {skillaborators?.length > 0 && (
          <button className="button" onClick={() => resetRound()}>
            <span>Reset</span>
          </button>
        )}
        <HowToPlayPrompt />

        <a
          className="button"
          onClick={() => {
            navigator.clipboard.writeText(room);
          }}
          href={`#`}
        >
          Create a room
        </a>
        {/* <a className="text-red-500 button" href={`/`}>
          Clear URL
        </a> */}
        <UserControl
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
        />
      </div>
    </header>
  );
};
