import { signInWithGoogle, userSignOut } from "../firebase/client";

export const Login = ({ setCurrentUser }: any) => {
  return (
    <div>
      <button onClick={() => signInWithGoogle(setCurrentUser)}>
        Sign in with google
      </button>
      |<button onClick={() => userSignOut(setCurrentUser)}>Sign out</button>
    </div>
  );
};
