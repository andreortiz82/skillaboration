import { LockControl } from "./ChallengeControls";

export const ChallengeDescription = ({
  challengeLocked,
  roundDescription,
  setChallengeLocked,
  setPlayerLocked,
}: any) => {
  return (
    <header className="mb-5 flex gap-3">
      <LockControl
        setChallengeLocked={setChallengeLocked}
        setPlayerLocked={setPlayerLocked}
        type="challenge"
        locked={challengeLocked}
      />
      <h1 className="flex text-8xl font-bold">{roundDescription}</h1>
    </header>
  );
};
