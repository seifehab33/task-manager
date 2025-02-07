import { Outlet, useLocation } from "react-router-dom";
import { Sidebar, Profile } from "../components";

function MainLayout() {
  const location = useLocation();

  return (
    <div className="flex">
      <Profile />
      {!["/", "/login"].includes(location.pathname) && <Sidebar />}

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
