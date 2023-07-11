import React, { useEffect, useState } from "react";
import _ from "lodash";
import {
  signInWithGoogle,
  userSignOut,
  checkAuthState,
  initializeGame,
  updateGame,
  createNewGame,
} from "../firebase/client";
import { Header, CurrentChallenage } from "./Shared";

export const GameBoard = (props: any) => {
  const [currentUser, setCurrentUser] = useState();
  const [players, setPlayers] = useState([]);
  const [game, setGame] = useState({ id: props.id });
  const url = new URL(window.location.href);
  const challenges = props.data.challenages;

  useEffect(() => {
    checkAuthState((user: any) => {
      setCurrentUser(user);

      initializeGame(game.id, user, (data: any) => {
        setGame(data);
        setPlayers(data.players);
      });
    });
  }, []);

  return (
    <>
      <Header
        signInWithGoogle={signInWithGoogle}
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
        userSignOut={userSignOut}
        url={url}
        game={game}
        challenages={challenges}
        setGame={setGame}
        createNewGame={createNewGame}
      />
      <main>
        <CurrentChallenage
          updateGame={updateGame}
          setGame={setGame}
          game={game}
          challenges={challenges}
        />

        <aside className="p-5">
          <ul className="flex gap-9">
            {players.length > 0 &&
              players.map((player: any) => (
                <li key={player.uid} className="flex flex-col items-center">
                  <div className="bg-slate-100 p-5 flex flex-col items-center rounded-md">
                    <img
                      className="w-12 rounded-full"
                      alt={player.email}
                      src={player.photoURL}
                    />
                    {player.displayName}
                  </div>
                </li>
              ))}
          </ul>
        </aside>
      </main>
      <footer className="p-5">
        <p>Made with love.</p>
      </footer>
    </>
  );
};
