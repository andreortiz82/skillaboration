import React, { useEffect, useState } from "react";
import {
  login,
  logout,
  userCheck,
  newChallege,
  createNewGame,
  saveGame,
  addPlayers,
  findGame,
} from "../app/controller";

import { checkAuth, signInWithGoogle, userSignOut } from "../firebase/client";

export const Application = (props: any) => {
  const [currentUser, setCurrentUser] = useState();
  const [players, setPlayers] = useState([]);
  const [game, setGame] = useState({ id: props.id });

  useEffect(() => {
    newChallege(props, (skill: any, challenge: any) => {
      setGame({ skill: skill, challenge: challenge, id: props.id });
    });

    checkAuth((user: any) => {
      setCurrentUser(user);

      if (props.id === null) {
      } else {
        findGame(props.id, user, gameData, (gameData: any) => {
          setGame(gameData);
          setPlayers(gameData.players);
        });
      }
    });
  }, []);

  return (
    <>
      <header className="p-5">
        <h1>Skillaboration</h1>
        <hr />
      </header>
      <main>
        <section className="p-5">
          <h4>Current User</h4>
          {currentUser === null ? (
            <button onClick={() => signInWithGoogle(setCurrentUser)}>
              Sign in with google
            </button>
          ) : (
            <>
              <details>
                <summary>User</summary>
                {JSON.stringify(currentUser)}
              </details>
              <button onClick={() => userSignOut(setCurrentUser)}>
                Sign out
              </button>
            </>
          )}
        </section>

        <section className="p-5">
          <h4>Players</h4>
          {JSON.stringify(players)}
        </section>

        <section className="p-5">
          <strong>{`${game.skill} ${game.challenge}`}</strong>

          <details>
            <summary>Skill / Challenge data</summary>
            {JSON.stringify(props.data)}
          </details>
        </section>

        <section className="p-5">
          <h4>Actions</h4>
          <nav className="flex gap-2">
            <button
              className="btn"
              onClick={() => {
                createNewGame(
                  game,
                  setGame,
                  currentUser,
                  setPlayers,
                  players,
                  (g: any) => {
                    console.log("create game", g);
                    window.location.replace(`/game/${g.id}`);
                  }
                );
              }}
            >
              New Game
            </button>
            <button className="btn">Add players</button>
            <button
              className="btn"
              onClick={() => {
                newChallege(props, (skill: any, challenge: any) => {
                  setGame({ skill: skill, challenge: challenge, id: props.id });
                });
              }}
            >
              Roll to play
            </button>
          </nav>
        </section>
      </main>
      <footer className="p-5">
        <hr />
        <p>Made with love.</p>
      </footer>
    </>
  );
};
