import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawer: false,
};

export const SidebarSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    toggleDrawer: (state, action) => {
      state.drawer = action.payload;
    },
  },
});

export const { toggleDrawer } = SidebarSlice.actions;

export default SidebarSlice.reducer;
