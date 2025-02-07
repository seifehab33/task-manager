import { GrTask } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import style from "./style.module.css";
import { NavLink } from "react-router-dom";
const { sideBar, SbLinks, sideBarLink } = style;
const sideBarLinks = [
  { id: 1, icon: <MdDashboard />, title: "Dashboard", path: "/dashboard" },
  {
    id: 2,
    icon: <GrCompliance />,
    title: "Completed Tasks",
    path: "/completed-tasks",
  },
  {
    id: 3,
    icon: <MdOutlinePendingActions />,
    title: "Pending Tasks",
    path: "/pending-tasks",
  },
  {
    id: 4,
    icon: <GrInProgress />,
    title: "InProgress Tasks",
    path: "/inprogress-tasks",
  },
  {
    id: 5,
    icon: <MdFormatListBulletedAdd />,
    title: "Add New Task",
    path: "/add-task",
  },
];
function Sidebar() {
  return (
    <div
      className={`xl:w-64 lg:w-52 md:w-48 sm:w-44 w-44 min-h-screen ${sideBar} `}
    >
      <div className="flex items-center justify-center gap-3 text-[15px] lg:text-xl  text-white font-extrabold">
        <span>
          <GrTask />
        </span>
        Task Manager
      </div>
      <div className={SbLinks}>
        {sideBarLinks.map((link) => (
          <div
            key={link.id}
            className={`flex items-center gap-3 py-3 md:py-3 lg:py-3  xl:py-3 sm:text-sm md:text-sm xl:text-[18px] ${sideBarLink} hover:text-gray-800 transition-colors duration-150 `}
          >
            <span>{link.icon}</span>
            <NavLink to={`${link.path}`}>{link.title}</NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
