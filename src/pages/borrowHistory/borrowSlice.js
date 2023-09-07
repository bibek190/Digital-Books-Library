import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  borrowHistoryList: [],
};

export const borrowHistorySlice = createSlice({
  name: "borrowHistory",
  initialState,
  reducers: {
    setBorrowHistories: (state, { payload }) => {
      state.borrowHistoryList = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBorrowHistories } = borrowHistorySlice.actions;

export default borrowHistorySlice.reducer;
