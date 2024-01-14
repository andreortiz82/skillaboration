import _ from "lodash";

interface HeaderProps {
  currentUser: any;
  setCurrentUser: any;
  userSignOut: (setCurrentUser: any) => void;
  userSignIn: (setCurrentUser: any) => void;
  createGame?: () => void;
}

export const Header = ({
  currentUser,
  userSignOut,
  userSignIn,
  createGame,
  setCurrentUser,
}: HeaderProps) => {
  return (
    <header>
      <div className="flex gap-4 justify-between">
        <h1 className="text-lg font-bold">
          <a href="/">Skillaboration</a>
        </h1>

        {currentUser ? (
          <div className="flex gap-4">
            <button className="btn" onClick={createGame}>
              New Game
            </button>
            <img
              className="w-8 rounded-full"
              alt={currentUser.email}
              src={currentUser.photoURL}
            />
            <button
              className="text-red-600"
              onClick={() => userSignOut(setCurrentUser)}
            >
              Sign out
            </button>
          </div>
        ) : (
          <button className="btn" onClick={() => userSignIn(setCurrentUser)}>
            Sign in with google
          </button>
        )}
      </div>
    </header>
  );
};

export const CurrentChallenage = ({ updateGame, game }: any) => {
  return (
    <section>
      <div className="flex flex-col gap-8">
        <h1 className="text-7xl font-bold">{game.challenge}</h1>
        <div>
          <button className="btn" onClick={() => updateGame(game)}>
            Re-roll
          </button>
        </div>
      </div>
    </section>
  );
};
