import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../lib/axiosClient";

const reviewsHttpClient = axiosClient("REVIEWS");
const hotelHttpClient = axiosClient("HOTEL");

export const fetchUserPastHotels = createAsyncThunk("hotel/booking/history", async (user_id) => {
  const response = (await hotelHttpClient.get(`hotel/booking/history/${user_id}`)).data;
  return response.data;
});

export const saveReviews =  async (user_id, hotel_id, review) => {
  const response = (await reviewsHttpClient.post(`save_reviews`, {
    user_id: user_id,
    hotel_id: hotel_id,
    review: review
  })).data;
  return response.data;
}

export const getRatingByHotel = async (hotel_id) => {
  const response = (await reviewsHttpClient.post(`get_rating_by_hotel`, {
    hotel_id: hotel_id
  })).data;
  return response.data;
}

export const getReviewsByHotel = async (hotel_id) => {
  const response = (await reviewsHttpClient.post(`get_reviews_by_hotel`, {
    hotel_id: hotel_id
  })).data;
  return response.data;
}

export const getRecommendations = async (data) => {
  const response = (await reviewsHttpClient.post(`get_recommendations`, {
    data: data
  })).data;
  return response.data;
}