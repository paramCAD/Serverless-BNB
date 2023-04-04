import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import historyReducer  from "../components/BookingHistory/slice/historySlice";
import feedbackSlice from "../components/Feedback/slice/feedbackSlice";
import hotelReducer from "../components/HotelManagement/slice/hotelSlice";
import SidebarReducer from "../components/Navbar/slice/SidebarSlice";
import notificationReducer from "../components/Notifications/slice/notificationSlice";


export const store = configureStore({
  reducer: {
    sidebar: SidebarReducer,
    hotel: hotelReducer,
    feedback: feedbackSlice,
    notification: notificationReducer,
    history: historyReducer
  },
  middleware: [thunk, logger],
});
