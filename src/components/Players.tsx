import { LockControl } from "./ChallengeControls";
import { Plus } from "phosphor-react";

export const Players = ({
  playerLocked,
  setPlayerLocked,
  players,
  party,
  addTeammate,
  delayRate,
  skillaborators,
}: any) => {
  return (
    <div className="flex gap-3 mt-8">
      <LockControl
        setPlayerLocked={setPlayerLocked}
        type="player"
        locked={playerLocked}
      />
      <div>
        <h2 className="text-4xl font-bold mb-4">Skillaborators:</h2>
        <ul className="flex gap-4 flex-wrap">
          {players?.map((player: any, index: any) => {
            return (
              <li key={`${player}-${index}`}>
                <article className="flex flex-col items-center justify-center">
                  <div
                    className={`
                            ${delayRate(index)}
                            ${
                              skillaborators.includes(player)
                                ? `animate-players`
                                : ``
                            }
                            border-neutral-950 
                            border-4 
                            w-16 
                            h-16 
                            rounded-full 
                            overflow-hidden
                            transition
                            duration-300
                            flex
                            justify-center
                            items-center`}
                  >
                    <span className="uppercase text-xl text-center">
                      {player.substring(0, 2)}
                    </span>
                  </div>
                  {player}
                </article>
              </li>
            );
          })}
          <li>
            <article
              onClick={() => addTeammate()}
              className="bg-white flex flex-col items-center justify-center cursor-pointer"
            >
              <div
                className={`
                            border-neutral-300 
                            border-4 
                            border-dashed
                            w-20 
                            h-20 
                            rounded-full 
                            overflow-hidden
                            transition
                            duration-300
                            hover:border-green-500
                            flex
                            justify-center
                            items-center`}
              >
                <span className="uppercase text-2xl text-center">
                  <Plus className="text-3xl" />
                </span>
              </div>
              Player
            </article>
          </li>
        </ul>
      </div>
    </div>
  );
};
