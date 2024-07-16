import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const AUTH_SLICE_STORE_KEY = "NETFLIX_CLONE_AUTH_SLICE_STORE_KEY";

export interface AuthState {
  email: string;
  accessToken: string;
  refreshToken: string;
}

const stored = localStorage.getItem(AUTH_SLICE_STORE_KEY);
let initialState: AuthState = {
  email: "",
  accessToken: "",
  refreshToken: "",
};
if (stored) {
  initialState = JSON.parse(stored);
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<AuthState>) => {
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      localStorage.setItem(
        AUTH_SLICE_STORE_KEY,
        JSON.stringify({
          email: action.payload.email,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        }),
      );
    },
    remove: (state) => {
      state.email = "";
      state.accessToken = "";
      state.refreshToken = "";
      localStorage.setItem(
        AUTH_SLICE_STORE_KEY,
        JSON.stringify({
          email: "",
          accessToken: "",
          refreshToken: "",
        }),
      );
    },
    refresh: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem(
        AUTH_SLICE_STORE_KEY,
        JSON.stringify({
          email: state.email,
          accessToken: action.payload,
          refreshToken: state.refreshToken,
        }),
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, remove, refresh } = authSlice.actions;

export default authSlice.reducer;
