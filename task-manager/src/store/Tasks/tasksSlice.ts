import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../types/Task";

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
  },
});

export const { setTasks, addTask } = tasksSlice.actions;
export const selectPendingTasks = (state: { Task: TasksState }) =>
  state.Task.tasks.filter((task) => task.status === "Pending");

export const selectCompletedTasks = (state: { Task: TasksState }) =>
  state.Task.tasks.filter((task) => task.status === "Completed");

export const selectInProgressTasks = (state: { Task: TasksState }) =>
  state.Task.tasks.filter((task) => task.status === "InProgress");
export default tasksSlice.reducer;
