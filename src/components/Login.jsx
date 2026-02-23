import { useState, useRef } from "react";
import { validate } from "../utils/validate";
import Header from "./Header";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [signIn, setSignIn] = useState(true);
  const [errorMsg, seterrorMsg] = useState(null);

  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    const message = validate(emailValue, passwordValue);
    seterrorMsg(message);

    if (message) return;

    //  Create auth ONCE (for both sign in & sign up)

    if (!signIn) {
      // SIGN UP
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          console.log("Signed Up User:", userCredential.user);
        })
        .catch((error) => {
          seterrorMsg(error.code + " " + error.message);
        });
    } else {
      // SIGN IN
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          console.log("Signed In User:", userCredential.user);
        })
        .catch((error) => {
          seterrorMsg(error.code + " " + error.message);
        });
    }
  };

  const togglepage = () => {
    setSignIn(!signIn);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/37372b0c-16ef-4614-9c66-f0464ffe4136/web/IN-en-20260216-TRIFECTA-perspective_74aa38a5-f527-417e-a604-a039567a350b_large.jpg"
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleButtonClick();
        }}
        className="absolute bg-black w-full md:w-1/3 text-white p-4 my-36 mx-auto right-0 left-0 opacity-85 rounded-2xl"
      >
        <h1 className="font-bold my-10 text-3xl">
          {signIn ? "Sign In" : "Sign Up"}
        </h1>

        {!signIn && (
          <input
            type="text"
            placeholder="Enter Name"
            className="w-full my-2 p-3 bg-gray-700 text-xl rounded-lg border-1 border-white"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="w-full my-2 p-3 bg-gray-700 text-xl rounded-lg border-1 border-white"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="w-full my-2 p-3 bg-gray-700 text-xl rounded-lg border-1 border-white"
        />

        {/* displaying the error message */}

        {errorMsg && <p className="text-red-500 text-md my-2">{errorMsg}</p>}

        <button
          type="submit"
          className="w-full bg-red-700 p-4 my-10 rounded-lg text-xl hover:bg-red-900"
        >
          {signIn ? "Sign In" : "Sign Up"}
        </button>

        <p className="cursor-pointer py-2" onClick={togglepage}>
          {signIn
            ? "New to Netflix.. Sign Up Now"
            : "Already a user Sign In..."}
        </p>
      </form>
    </div>
  );
};

export default Login;
