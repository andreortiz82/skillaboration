import React, { useEffect, useState } from "react";
import _ from "lodash";
import {
  signInWithGoogle,
  userSignOut,
  checkAuthState,
  createNewGame,
} from "../firebase/client";

export const App = (props: any) => {
  const challenges = props.data.challenages;
  const [currentUser, setCurrentUser] = useState();
  const [game, setGame] = useState({
    id: props.id,
    challenge: _.sampleSize(challenges, 1)[0],
  });
  const url = new URL(window.location.href);

  useEffect(() => {
    checkAuthState((user: any) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <>
      <header className="p-5">
        <div className="flex gap-4">
          <h1>Skillaboration</h1>
          {currentUser ? (
            <details>
              <summary>{currentUser.displayName}</summary>
              <p>ID: {currentUser.uid}</p>
              <p>EMAIL: {currentUser.email}</p>
              <p>DISPLAY_NAME: {currentUser.displayName}</p>
              <p>PHOTO_URL: {currentUser.photoURL}</p>
              <p className="break-words max-w-5xl">
                ACCESS_TOKEN: {currentUser.accessToken}
              </p>
              <button onClick={() => userSignOut(setCurrentUser)}>
                Sign out
              </button>
            </details>
          ) : (
            <button onClick={() => signInWithGoogle(setCurrentUser)}>
              Sign in with google
            </button>
          )}
        </div>
        <hr />
      </header>
      <main>
        <section className="p-5">
          <div>
            <h1>{game.challenge}</h1>
            <button
              onClick={() => {
                setGame({
                  ...game,
                  challenge: _.sampleSize(challenges, 1)[0],
                });
              }}
            >
              Re-roll
            </button>
          </div>
          <hr />
          <button
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
            Create Game
          </button>
        </section>
      </main>
      <footer className="p-5">
        <hr />
        <p>Made with love.</p>
      </footer>
    </>
  );
};
