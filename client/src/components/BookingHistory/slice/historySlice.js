import { createSlice } from "@reduxjs/toolkit";
import {
  fetchHistory
} from "../service/history-management-rest";

const initialState = {
  history: {
    isFetching: false,
    list: [],
  },
};

const fetchHistoryAction = (state, action) => {
  state.history.list = action.payload.history;
  state.history.isFetching = false;
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHistory.fulfilled, fetchHistoryAction);
    builder.addCase(fetchHistory.pending, (state) => {
      state.history.isFetching = true;
    });
  },
});

// export const {} = bargainSlice.actions;

export default historySlice.reducer;
