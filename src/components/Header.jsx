import { getAuth, signOut } from "firebase/auth";
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"
const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handlesignInOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
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
