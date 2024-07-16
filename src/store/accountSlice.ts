import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
});

export const { add, remove, addAccoutId } = accountSlice.actions;

export default accountSlice.reducer;
