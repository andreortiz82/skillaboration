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
    <div className="flex gap-4 flex-col justify-center absolute right-8 md:static">
      <button
        disabled={disabled}
        onClick={() => {
          type === "player"
            ? setPlayerLocked(!locked)
            : setChallengeLocked(!locked);
        }}
        className={`
        ${locked === true ? "bg-slate-200" : "bg-slate-100 bg-opacity-50"}
        p-3 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white rounded-full cursor-pointer hover:bg-slate-200 ease-in-out duration-200`}
      >
        {locked === true ? (
          <Lock className="text-2xl" />
        ) : (
          <LockOpen className="text-2xl" />
        )}
      </button>
    </div>
  );
};
