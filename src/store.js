import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./pages/books/bookSlice";
import borrowReducer from "./pages/borrowHistory/borrowSlice";
import adminReducer from "./user/useSlice";
export const store = configureStore({
  reducer: {
    adminInfo: adminReducer,
    book: bookReducer,
    borrowHistory: borrowReducer,
  },
});
