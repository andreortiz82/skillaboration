import _ from "lodash";

export const Header = ({
  currentUser,
  userSignOut,
  signInWithGoogle,
  setCurrentUser,
  createNewGame,
  challenges,
  setGame,
  game,
  url,
}: any) => {
  return (
    <header className="p-5">
      <div className="flex gap-4 justify-between">
        <h1 className="text-lg font-bold">
          <a href="/">Skillaboration</a>
        </h1>

        {currentUser ? (
          <div className="flex gap-4">
            <button
              className="btn"
              onClick={() =>
                createNewGame(
                  game,
                  _.sampleSize(challenges, 1)[0],
                  currentUser,
                  (game: any) => {
                    setGame(game);
                    const room = `${url.toString()}game/${game.id}`;
                    navigator.clipboard.writeText(room);
                    window.open(room, "_blank");
                  }
                )
              }
            >
              Create New Game
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
          <button
            className="btn"
            onClick={() => signInWithGoogle(setCurrentUser)}
          >
            Sign in with google
          </button>
        )}
      </div>
    </header>
  );
};

export const CurrentChallenage = ({
  updateGame,
  setGame,
  game,
  challenges,
}: any) => {
  return (
    <section className="p-5">
      <div className="flex flex-col gap-8">
        <h1 className="text-7xl font-bold">{game.challenge}</h1>
        <div>
          <button
            className="btn"
            onClick={() => {
              updateGame(
                game.id,
                _.sampleSize(challenges, 1)[0],
                (game: any) => {
                  setGame(game);
                }
              );
            }}
          >
            Re-roll
          </button>
        </div>
      </div>
    </section>
  );
};
