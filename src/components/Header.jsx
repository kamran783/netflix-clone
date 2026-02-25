import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase"
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
import {useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth"
import {useDispatch} from "react-redux"
import {adduser, removeuser} from "../utils/userSlice";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handlesignInOut = () => {

    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });

  };

   useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in,

        const { uid, email, displayName, photoURL } = user;
        //creating a newobject in adduser(adding a user in a object details)
        dispatch(
          adduser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoUrl: photoURL,
          }),
        );
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        dispatch(removeuser());
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="absolute w-screen px-4 bg-gradient-to-b from-black z-10 flex justify-between items-center">
      <img
        className="w-44"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-02-12/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
      {user && <div className="flex">
        <img
          className="w-[50px] rounded-lg"
          src={user?.photoUrl}
          alt="usericon"
        />
        <button
          className="bg-red-500 text-white text-sm rounded-lg px-1 mx-3 font-md font-medium"
          onClick={handlesignInOut}
        >
          Sign Out
        </button>
      </div>}
    </div>
  );
};

export default Header;
