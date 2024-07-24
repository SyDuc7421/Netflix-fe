import { AsyncThunkConfig } from "../../node_modules/@reduxjs/toolkit/dist/createAsyncThunk";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  accountResponseProps,
  getAccountById,
  getAccoutByIDProps,
} from "../services/accountService";

const ACCOUNT_SLICE_STORE_KEY = "NETFLIX_CLONE_ACCOUNT_SLICE_STORE_KEY";

export interface AccountState {
  _id: string;
  userId: string;
  accountName: string;
  favorites: string[];
}

let initialState: AccountState = {
  _id: "",
  userId: "",
  accountName: "",
  favorites: [],
};
const stored = sessionStorage.getItem(ACCOUNT_SLICE_STORE_KEY);
if (stored) {
  initialState = JSON.parse(stored);
}

export const getAccountByIdThunk = createAsyncThunk<
  accountResponseProps,
  getAccoutByIDProps,
  AsyncThunkConfig
>("account/getAccountById", async (data: getAccoutByIDProps, thunkApi) => {
  const response = await getAccountById(data);

  if (response.status === 200) {
    return response.data;
  }
  return thunkApi.rejectWithValue(response.message);
});

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<AccountState>) => {
      state._id = action.payload._id;
      state.userId = action.payload.userId;
      state.accountName = action.payload.accountName;
      state.favorites = action.payload.favorites;
      sessionStorage.setItem(
        ACCOUNT_SLICE_STORE_KEY,
        JSON.stringify({
          _id: action.payload._id,
          userId: action.payload.userId,
          accountName: action.payload.accountName,
          favorites: action.payload.favorites,
        }),
      );
    },
    remove: (state) => {
      state._id = "";
      state.accountName = "";
      state.userId = "";
      state.favorites = [];
      sessionStorage.setItem(
        ACCOUNT_SLICE_STORE_KEY,
        JSON.stringify({
          _id: "",
          userId: "",
          accountName: "",
          favorites: [],
        }),
      );
    },
    addAccoutId: (state, action: PayloadAction<string>) => {
      state._id = action.payload;
      sessionStorage.setItem(
        ACCOUNT_SLICE_STORE_KEY,
        JSON.stringify({
          _id: action.payload,
          userId: "",
          accountName: "",
          favorites: "",
        }),
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(getAccountByIdThunk.fulfilled, (state, action) => {
      state._id = action.payload._id;
      state.accountName = action.payload.accountName;
      state.userId = action.payload.userId;
      state.favorites = action.payload.favorites;
    });
  },
});

export const { add, remove, addAccoutId } = accountSlice.actions;

export default accountSlice.reducer;
