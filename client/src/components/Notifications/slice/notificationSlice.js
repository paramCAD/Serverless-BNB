import { createSlice } from "@reduxjs/toolkit";
import { fetchNotifications } from "../services/notification-rest";

const initialState = {
  data: {
    list: [],
    isFetching: false,
  },
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.data.list = action.payload;
      state.data.isFetching = false;
    });
    builder.addCase(fetchNotifications.pending, (state) => {
        state.data.isFetching = true;
      });
  },
});

// Action creators are generated for each case reducer function
// export const { updateNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;
