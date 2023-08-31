import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./pages/books/bookSlice";
import adminReducer from "./user/useSlice";
export const store = configureStore({
  reducer: {
    adminInfo: adminReducer,
    book: bookReducer,
  },
});
