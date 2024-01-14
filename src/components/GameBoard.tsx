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
  const [currentUser, setCurrentUser] = useState("");
  const [game, setGame] = useState({ id: "", challenge: "" });
  const [players, setPlayers] = useState([]);

  const url = new URL(window.location.href);

  useEffect(() => {
    checkAuthState((user: any) => {
      setCurrentUser(user);

      initializeGame(props.id, user, (data: any) => {
        setGame(data);
        setPlayers(data.players);
      });
    });
  }, []);

  return (
    <main className="p-5">
      <Header
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        userSignOut={() => userSignOut(setCurrentUser)}
        userSignIn={() => signInWithGoogle(setCurrentUser)}
        createGame={() => {
          createNewGame({
            game: { challenge: game.challenge },
            currentUser: currentUser,
            callback: (game: any) => {
              setTimeout(() => {
                location.replace(`/game/${game.id}`);
              }, 500);
            },
          });
        }}
      />
      <h1 className="text-8xl font-bold my-20">{game.challenge}</h1>

      <CurrentChallenage game={game} updateGame={updateGame} />

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
                  {player.email}
                </div>
              </li>
            ))}
        </ul>
      </aside>
      <footer>
        <p>Made with love.</p>
        <details>
          <summary>Game</summary>
          <pre>{JSON.stringify(game, null, 2)}</pre>
        </details>
        <details>
          <summary>CurrentUser</summary>
          <pre>{JSON.stringify(currentUser, null, 2)}</pre>
        </details>
      </footer>
    </main>
  );
};
