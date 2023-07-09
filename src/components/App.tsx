import React, { useEffect, useState } from "react";
import { signInWithGoogle, userSignOut, checkAuth } from "../firebase/client";

export const App = (props: any) => {
  const [currentUser, setCurrentUser] = useState();
  const [players, setPlayers] = useState([]);
  const [game, setGame] = useState({ id: props.id });

  useEffect(() => {
    checkAuth((user: any) => {
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
        <section className="p-5"> </section>
      </main>
      <footer className="p-5">
        <hr />
        <p>Made with love.</p>
      </footer>
    </>
  );
};
