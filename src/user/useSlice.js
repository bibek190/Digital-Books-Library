import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: {},
};

const useSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      console.log("action.payload", action.payload);
      state.admin = action.payload;
    },
  },
});

export const { setAdmin } = useSlice.actions;

export default useSlice.reducer;
