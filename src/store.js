import adminReducer from "./user/useSlice";
import bookReducer from "./pages/books/bookSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    adminInfo: adminReducer,
    bookInfo: bookReducer,
  },
});
export default store;
