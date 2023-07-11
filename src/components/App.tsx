import React, { useEffect, useState } from "react";
import _ from "lodash";
import {
  signInWithGoogle,
  userSignOut,
  checkAuthState,
  createNewGame,
} from "../firebase/client";
import { Header, CurrentChallenage } from "./Shared";

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
      <Header
        signInWithGoogle={signInWithGoogle}
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
        createNewGame={createNewGame}
        userSignOut={userSignOut}
        url={url}
        game={game}
        challenages={challenges}
        setGame={setGame}
      />

      <main>
        <CurrentChallenage
          updateGame={() => {
            setGame({
              ...game,
              challenge: _.sampleSize(challenges, 1)[0],
            });
          }}
          setGame={setGame}
          game={game}
          challenges={challenges}
        />
      </main>
      <footer className="p-5">
        <p>Made with love.</p>
      </footer>
    </>
  );
};
