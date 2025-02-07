import { configureStore } from "@reduxjs/toolkit";
import Task from "./Tasks/tasksSlice";
import UserRegister from "./User/userRegitserSlice";
import UserLogin from "./User/userLoginSlice";
const store = configureStore({
  reducer: { Task: Task, UserRegister: UserRegister, UserLogin: UserLogin },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
