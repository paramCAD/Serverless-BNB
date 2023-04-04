import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosClient from "../../../lib/axiosClient";

const httpClient = axiosClient("HOTEL");

export const fetchHotels = createAsyncThunk("hotel/list", async () => {
  const response = (await httpClient.get("/hotel")).data;
  return response.data;
});

export const fetchRoomsOfHotel = createAsyncThunk(
  "hotel/rooms",
  async (details) => {
    const { hotelId, startDate: start_date, endDate: end_date } = details;
    const response = (
      await httpClient.get(`/hotel/${hotelId}/rooms`, {
        params: { start_date, end_date },
      })
    ).data;
    return response.data;
  }
);

export const bookHotelRooms = createAsyncThunk(
  "hotel/book-rooms",
  async (details, thunkAPI) => {
    const { hotel_id, room_id } = details;

    delete details.hotel_id;
    delete details.room_id;

    const response = (
      await httpClient.post(
        `/hotel/${hotel_id}/rooms/${room_id}/booking`,
        details
      )
    ).data;

    toast.success(`Your room for dates ${new Date(
      details.start_date
    ).toDateString()} - 
    ${new Date(details.end_date).toDateString()} is booked successfully`);

    return response.data;
  }
);
