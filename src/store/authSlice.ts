import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const AUTH_SLICE_STORE_KEY = "NETFLIX_CLONE_AUTH_SLICE_STORE_KEY";

export interface AuthState {
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

const initialState: AuthState = {
  username: "",
  email: "",
  accessToken: "",
  refreshToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<AuthState>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      localStorage.setItem(
        AUTH_SLICE_STORE_KEY,
        JSON.stringify({
          username: action.payload.username,
          email: action.payload.email,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        })
      );
    },
    remove: (state) => {
      state.username = "";
      state.email = "";
      state.accessToken = "";
      state.refreshToken = "";
      localStorage.setItem(
        AUTH_SLICE_STORE_KEY,
        JSON.stringify({
          username: "",
          email: "",
          accessToken: "",
          refreshToken: "",
        })
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, remove } = authSlice.actions;

export default authSlice.reducer;
