import React, { useEffect, useState } from "react";
import _ from "lodash";
import {
  signInWithGoogle,
  userSignOut,
  checkAuthState,
  createNewGame,
  updateGame,
} from "../firebase/client";

import { Header } from "./Shared";

export const App = (props: any) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentChallenage, setCurrentChallenager] = useState(
    _.sample(props.data.challenages)
  );
  const url = new URL(window.location.href);

  useEffect(() => {
    checkAuthState((user: any) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <>
      <main className="p-5">
        <Header
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          userSignOut={() => userSignOut(setCurrentUser)}
          userSignIn={() => signInWithGoogle(setCurrentUser)}
          createGame={() => {
            createNewGame({
              game: { challenge: currentChallenage },
              currentUser: currentUser,
              callback: (game: any) => {
                setTimeout(() => {
                  location.replace(`/game/${game.id}`);
                }, 500);
              },
            });
          }}
        />
        <h1 className="text-8xl font-bold my-20">{currentChallenage}</h1>
      </main>
      <footer className="p-5">
        <p>Made with love.</p>
        <details>
          <summary>CurrentUser</summary>
          <pre>{JSON.stringify(currentUser, null, 2)}</pre>
        </details>
      </footer>
    </>
  );
};
