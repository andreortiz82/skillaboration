import { HowToPlayPrompt } from "./HowToPlay";
import { DiceThree } from "phosphor-react";

export const ChallengeHeader = ({
  party,
  rollDice,
  skillaborators,
  resetRound,
  room,
}: any) => {
  return (
    <header className="mb-5 flex justify-between">
      <div className="flex gap-6 items-center">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Skillaboration!
          </h1>
          <p className="text-xl font-light">Work together. Learn Together.</p>
        </div>
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
      <div className="flex gap-6 items-center">
        <HowToPlayPrompt />

        <a
          onClick={() => {
            navigator.clipboard.writeText(room);
          }}
          href={`#`}
        >
          Copy URL
        </a>
        <a className="text-red-500" href={`/`}>
          Clear URL
        </a>
      </div>
    </header>
  );
};
