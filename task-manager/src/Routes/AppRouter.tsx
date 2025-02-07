import { createBrowserRouter } from "react-router-dom";
import {
  Home,
  AddTask,
  PendingTask,
  ProgressTask,
  CompletedTask,
  Login,
} from "../pages";
import { NotFound } from "../components";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Login /> },
      { path: "Dashboard", element: <Home /> },
      { path: "add-task", element: <AddTask /> },
      { path: "pending-tasks", element: <PendingTask /> },
      { path: "inprogress-tasks", element: <ProgressTask /> },
      { path: "completed-tasks", element: <CompletedTask /> },
    ],
  },
  { path: "*", element: <NotFound /> }, // Handle 404
]);

export default router;
