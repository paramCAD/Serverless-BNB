import { createSlice } from "@reduxjs/toolkit";
import { bookHotelRooms, fetchHotels, fetchRoomsOfHotel } from "../service/hotel-management-rest";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  hotel: {
    isFetching: false,
    list: [],
  },
  rooms: {
    isFetching: false,
    list: [],
  },
  booking: {
    id: ""
  }
};

const fetchHotelsAction = (state, action) => {
  state.hotel.list = action.payload;
  state.hotel.isFetching = false;
};

const fetchRoomsOfHotelAction = (state, action) => {
  state.rooms.list = action.payload;
  state.rooms.isFetching = false;
}

const bookHotelRoomsAction = (state) => {
  state.booking.id = uuidv4()
}

export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHotels.fulfilled, fetchHotelsAction);
    builder.addCase(fetchHotels.pending, (state) => {
      state.hotel.isFetching = true;
    });

    builder.addCase(fetchRoomsOfHotel.fulfilled, fetchRoomsOfHotelAction);
    builder.addCase(fetchRoomsOfHotel.pending, (state) => {
      state.rooms.isFetching = true;
    });

    builder.addCase(bookHotelRooms.fulfilled, bookHotelRoomsAction);

  },
});

// export const {} = bargainSlice.actions;

export default hotelSlice.reducer;
