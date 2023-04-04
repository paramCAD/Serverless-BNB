import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../lib/axiosClient";

const httpClient = axiosClient("HOTEL");

export const fetchHistory = createAsyncThunk("history/list", async (user_id) => {
  const response = (await httpClient.get(`/hotel/booking/history/${user_id}`)).data;
  return response.data;
});
