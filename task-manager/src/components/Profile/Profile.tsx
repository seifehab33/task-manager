import React from "react";
import person from "../../assets/person-icon.png";
import { CiLogout } from "react-icons/ci";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/User/userLoginSlice";
import { useNavigate } from "react-router-dom";
const Profile: React.FC = () => {
  const name = localStorage.getItem("name");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="absolute right-3 flex items-center">
      <h1 className="text-xl capitalize font-bold text-black">{name}</h1>
      <div className="border-4 border-solid  m-3 rounded-xl p-1">
        <img src={person} className="w-6 h-6" alt="" />
      </div>
      <button
        className="logout border-4 cursor-pointer border-solid  m-3 rounded-xl p-1 "
        onClick={handleLogOut}
      >
        <CiLogout size={30} />
      </button>
    </div>
  );
};
export default Profile;
