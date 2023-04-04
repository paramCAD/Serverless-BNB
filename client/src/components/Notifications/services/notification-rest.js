import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../lib/axiosClient";

const httpClient = axiosClient("NOTIFICATION");

export const fetchNotifications = createAsyncThunk(
  "notification/list",
  async (user_id) => {
    const response = (await httpClient.get("/notifications", {
      params: {
        user_id,
      },
    })).data;

    return response.data;
  }
);
