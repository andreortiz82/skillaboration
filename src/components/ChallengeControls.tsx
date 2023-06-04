import React from "react";
import { Lock, LockOpen } from "phosphor-react";

export const LockControl = ({
  type,
  locked,
  setPlayerLocked,
  setChallengeLocked,
  disabled,
}: any) => {
  return (
    <div className="flex gap-4 flex-col justify-center">
      <button
        disabled={disabled}
        onClick={() => {
          type === "player"
            ? setPlayerLocked(!locked)
            : setChallengeLocked(!locked);
        }}
        className="p-3 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white rounded-full cursor-pointer bg-white hover:bg-gray-200 ease-in-out duration-200"
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
