import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: !!localStorage.getItem("idToken"),
  },
  reducers: {
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    },
  },
});

export const authActions = AuthSlice.actions;

export default AuthSlice.reducer;
