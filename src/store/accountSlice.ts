import { AsyncThunkConfig } from "../../node_modules/@reduxjs/toolkit/dist/createAsyncThunk";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  accountResponseProps,
  getAccountById,
  getAccoutByIDProps,
} from "../services/accountService";

export interface AccountState {
  _id: string;
  userId: string;
  accountName: string;
  favorites: { movieId: string }[];
}

const initialState: AccountState = {
  _id: "",
  userId: "",
  accountName: "",
  favorites: [],
};

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
    },
    remove: (state) => {
      state = initialState;
    },
    addAccoutId: (state, action: PayloadAction<string>) => {
      state._id = action.payload;
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
