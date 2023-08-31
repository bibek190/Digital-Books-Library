import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: {},
};

export const useSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAdmin: (state, { payload }) => {
      state.admin = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAdmin } = useSlice.actions;

export default useSlice.reducer;
