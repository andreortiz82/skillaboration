import React from "react";
import {
  signInWithGoogle,
  userSignOut,
  checkAuth,
  writeData,
  getData,
} from "../firebase/client";

const writeDataCallback = (data: any) => {
  console.log("----------- start");
  console.log(data);
  console.log("----------- end");
};

export const UserControl = ({ setCurrentUser, currentUser }: any) => {
  // React.useEffect(() => {

  // });
  // checkAuth(setCurrentUser);

  return (
    <div>
      {currentUser !== null ? (
        <div>
          <span>
            <img src={currentUser.photoURL} />
          </span>
          <button onClick={() => userSignOut(setCurrentUser)}>Sign out</button>
        </div>
      ) : (
        <button onClick={() => signInWithGoogle(setCurrentUser)}>
          Sign in with google
        </button>
      )}

      {/* <button
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
      </button> */}
    </div>
  );
};
