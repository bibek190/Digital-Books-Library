import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookList: [],
  selectedBook: {}
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBooks: (state, { payload }) => {
      state.bookList = payload;
    },
    setSelectedBook: (state, { payload }) => {
      state.selectedBook = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBooks, setSelectedBook } = bookSlice.actions;

export default bookSlice.reducer;
