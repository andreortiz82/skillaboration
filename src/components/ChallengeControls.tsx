import React from "react";
import { Lock, LockOpen } from "phosphor-react";

export const LockControl = ({
  type,
  locked,
  setPlayerLocked,
  setChallengeLocked,
}: any) => {
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
