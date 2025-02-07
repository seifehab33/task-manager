import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAppDispatch } from "../store/hooks";
import { Task } from "../types/Task";
import { setTasks } from "../store/Tasks/tasksSlice";

const API_BASE_URL = "http://localhost:8000/api/tasks/";

export const useGetTasks = () => {
  const dispatch = useAppDispatch();

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const token = localStorage.getItem("token"); // ✅ Get token inside queryFn
      if (!token) {
        console.error("❌ No token found!");
        throw new Error("User is not authenticated");
      }

      console.log("🔍 Fetching tasks with token:", token);
      const response = await axios.get(API_BASE_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Ensure correct formatting
          "Content-Type": "application/json",
        },
      });

      console.log("✅ Tasks response:", response.data);
      dispatch(setTasks(response.data));
      return response.data;
    },
    staleTime: 60000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return { tasks: tasks || [], isLoading, error };
};
