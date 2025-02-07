import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAppDispatch } from "../store/hooks";
import { NewTask } from "../types/Task";
import { addTask } from "../store/Tasks/tasksSlice";

const API_BASE_URL = "http://localhost:8000/api/tasks/create/";

export const useCreateTask = (resetFormData: () => void) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { mutate: createTask, isPending } = useMutation({
    mutationFn: async (newTask: NewTask) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated");

      const response = await axios.post(API_BASE_URL, newTask, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT expects "Bearer <token>"
        },
      });

      return response.data;
    },
    onSuccess: (data) => {
      dispatch(addTask(data)); // Add task to Redux store
      queryClient.invalidateQueries({ queryKey: ["tasks"] }); // Refresh task list
      resetFormData(); // Reset form after successful submission
    },
    onError: (error) => {
      console.error("Error creating task:", error.message);
    },
  });

  return { createTask, isPending };
};
