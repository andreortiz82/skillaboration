import {
  signInWithGoogle,
  userSignOut,
  writeData,
  getData,
} from "../firebase/client";

const writeDataCallback = (data: any) => {
  console.log("----------- start");
  console.log(data);
  console.log("----------- end");
};

export const Login = ({ setCurrentUser }: any) => {
  return (
    <div>
      <button onClick={() => signInWithGoogle(setCurrentUser)}>
        Sign in with google
      </button>
      |<button onClick={() => userSignOut(setCurrentUser)}>Sign out</button>|
      <button
        onClick={() =>
          writeData(
            "skills",
            { list: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"] },
            (data: any) => writeDataCallback(data)
          )
        }
      >
        Write Data
      </button>
      <button
        onClick={() =>
          getData("skills", (data: any) => writeDataCallback(data))
        }
      >
        Get Data
      </button>
    </div>
  );
};
