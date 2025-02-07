import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  token: string | null;
  isAuthenticated: boolean;
  name: string;
}

const initialState: UserState = {
  token: sessionStorage.getItem("token") || null,
  isAuthenticated: !!sessionStorage.getItem("token"),
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ token: string; name: string }>
    ) => {
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.isAuthenticated = true;
      sessionStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem("token");
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
