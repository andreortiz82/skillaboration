import { checkAuth, signInWithGoogle, userSignOut, getData, postData, initializeGame } from "../firebase/client";
import uniqid from "uniqid";
import _ from "lodash";

export const createNewGame = (game:any, setGame:any, currentUser:any, setPlayers:any, players:any, callback:any) => {
  const newGameId = uniqid()
  const newPlayers = [currentUser.email, ...players]
  const newGame = {skill:game.skill, challenge:game.challenge, players: newPlayers, id: newGameId}
  setPlayers(newPlayers)
  setGame(newGame)
  postData(`games/${newGameId}`, {id:newGameId, players:newPlayers, skill:game.skill, challenge:game.challenge}, ()=>callback(newGame))
};

export const findGame = (gameId:any, user:any, gameData:any, callback:any) => {
  initializeGame(gameId, (data:any)=>{
    const newPlayers = [user.email, ...data.players]
    const uniquePlayers = [...new Set(newPlayers)];
    const newGame = {skill:data.skill, challenge:data.challenge, id:gameId, players: uniquePlayers}
    postData(`games/${newGame.id}`, {id:newGame.id, players:uniquePlayers, skill:gameData.skill, challenge:gameData.challenge}, ()=> {
      callback(newGame);
    })
  })
}

export const saveGame = (game:any, callback:any) => {
  postData(`games/${game.id}`, game, ()=>callback(game))
}

export const addPlayers = (gameId:any, currentUser:any, players:any, setPlayers:any, callback:any, game:any, setGame:any) => {
  // setPlayers([currentUser.email, ...players])
  // console.log(currentUser)
  // const newPlayers = (game.players !== null) ? [currentUser, ...JSON.parse(game.players)] : [currentUser]
  // get game data
  // getData(`games/${game.id}`, (data:any)=>{
  //   setPlayers(newPlayers);
  //   postData(`games/${game.id}`, {id:game.id, players: JSON.stringify(newPlayers)}, ()=>callback(newPlayers))
  // })

  // 
  // setPlayers([currentUser, ...currentPlayers]);
  // update game data

  // setPlayers([currentUser, ...players]);
  // postData(`games/${gameId}`, {players: ['currentUser']}, ()=>true)

};

export const newChallege = (props:any, callback:any) => {
  const skill = _.sample(props.data.skills.general)
  const challenge = _.sample(props.data.challenges.general)
  callback(skill, challenge)
}

export const resetGame = () => {

}

export const confettiParty = () => {
  
}

export const delayRate = (index: any) => {
  const options = ["delay-0", "delay-1000", "delay-0"];
  return options[index];
};

export const login = (props:any) => {
  signInWithGoogle(props)
}

export const logout = (props:any) => {
  userSignOut(props)
}

export const userCheck = (callback:any) => {
  checkAuth(callback)
}
