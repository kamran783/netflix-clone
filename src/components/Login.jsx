import { useState, useRef } from "react";
import { validate } from "../utils/validate";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {useDispatch} from "react-redux";
import {adduser} from "../utils/userSlice"

import { auth } from "../utils/firebase";

const Login = () => {
  const [signIn, setSignIn] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    const message = validate(emailValue, passwordValue);
    setErrorMsg(message);

    if (message) return;

    // ========================
    // SIGN UP
    // ========================
    if (!signIn) {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;

          // Update profile
          return updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://i.pravatar.cc/300",
          });
        })
        .then(() => {
          //we use auth here becoz user doesnt have updated value
          const { uid, email, displayName, photoURL } = auth.currentUser;
          //updating the user profile
          dispatch(
            adduser({
              uid: uid,
              email: email,
              displayName: displayName,
              photoUrl: photoURL,
            }),
          );
          navigate("/browse");
        })
        .catch((error) => {
          setErrorMsg(error.code + " - " + error.message);
        });
    }

    // ========================
    // SIGN IN
    // ========================
    else {
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then(() => {
          navigate("/browse");
        })
        .catch((error) => {
          setErrorMsg(error.code + " - " + error.message);
        });
    }
  };

  const togglePage = () => {
    setSignIn(!signIn);
    setErrorMsg(null);
  };

  return (
    <div>
      <Header />

      {/* Background Image */}
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/37372b0c-16ef-4614-9c66-f0464ffe4136/web/IN-en-20260216-TRIFECTA-perspective_74aa38a5-f527-417e-a604-a039567a350b_large.jpg"
          alt="background"
          className="w-screen h-screen object-cover"
        />
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleButtonClick();
        }}
        className="absolute bg-black bg-opacity-80 w-full md:w-1/3 text-white p-8 my-36 mx-auto right-0 left-0 rounded-2xl"
      >
        <h1 className="font-bold my-6 text-3xl">
          {signIn ? "Sign In" : "Sign Up"}
        </h1>

        {!signIn && (
          <input
            ref={name}
            type="text"
            placeholder="Enter Name"
            className="w-full my-3 p-3 bg-gray-700 text-lg rounded-lg border border-white"
            required
          />
        )}

        <input
          ref={email}
          type="email"
          placeholder="Email Address"
          className="w-full my-3 p-3 bg-gray-700 text-lg rounded-lg border border-white"
          required
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="w-full my-3 p-3 bg-gray-700 text-lg rounded-lg border border-white"
          required
        />

        {errorMsg && <p className="text-red-500 text-md my-2">{errorMsg}</p>}

        <button
          type="submit"
          className="w-full bg-red-700 p-3 my-6 rounded-lg text-lg hover:bg-red-900 transition"
        >
          {signIn ? "Sign In" : "Sign Up"}
        </button>

        <p className="cursor-pointer py-2 text-sm" onClick={togglePage}>
          {signIn ? "New to Netflix? Sign Up Now" : "Already a user? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
