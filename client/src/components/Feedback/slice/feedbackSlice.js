import { createSlice } from "@reduxjs/toolkit";
import { fetchUserPastHotels } from "../service/feedback-rest";

const initialState = {
  pastHotels: {
    isFetching: false,
    list: [],
  }
};

const fetchPastHotelsAction = (state, action) => {
  state.pastHotels.list = action.payload?.history || [];
  state.pastHotels.isFetching = false;
};

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserPastHotels.fulfilled, fetchPastHotelsAction);
    builder.addCase(fetchUserPastHotels.pending, (state) => {
      state.pastHotels.isFetching = true;
    });
  },
});

// export const {} = feedbackSlice.actions;

export default feedbackSlice.reducer;
