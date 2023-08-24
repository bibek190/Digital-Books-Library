import adminReducer from "./user/useSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    adminInfo: adminReducer,
  },
});
export default store;
