import React from "react";
import { signInWithGoogle, userSignOut, getData } from "../../firebase/client";

const writeDataCallback = (data: any) => {
  console.log("----------- start");
  console.log(data);
  console.log("----------- end");
};

export const UserControl = ({ setCurrentUser, currentUser }: any) => {
  return (
    <div>
      {currentUser !== null ? (
        <div className="flex items-center gap-2">
          <button
            className="button"
            onClick={() => userSignOut(setCurrentUser)}
          >
            Sign out
          </button>
          <span>
            <img
              className="w-10 h-10 rounded-full"
              src={currentUser.photoURL}
            />
          </span>
        </div>
      ) : (
        <button
          className="button"
          onClick={() => signInWithGoogle(setCurrentUser)}
        >
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
