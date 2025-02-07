import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";

interface AuthState {
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: sessionStorage.getItem("jwt_token") || null,
  user: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerSuccess: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      console.log(state.user);
      sessionStorage.setItem("jwt_token", action.payload.token);
    },
  },
});

export const { registerSuccess } = registerSlice.actions;
export default registerSlice.reducer;
