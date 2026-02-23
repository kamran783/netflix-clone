import Login from "./Login";
import Browse from "./Browse";
import { useEffect } from "react";
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import {useDispatch} from "react-redux";
import {adduser,removeuser}from "../utils/userSlice"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const Body = () => {

    const dispatch = useDispatch();


  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, 

        const {uid, email, displayName, photoURL} = user;
        //creating a newobject in adduser(adding a user in a object details)
        dispatch(adduser({uid : uid, email:email, displayName:displayName, photoUrl : photoURL}));
        // ...
      } else {
        // User is signed out
        dispatch(removeuser());
      }
    });
  }, []);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};
export default Body;
