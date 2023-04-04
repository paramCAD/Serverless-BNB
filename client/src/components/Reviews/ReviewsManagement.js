import { Grid } from "@mui/material";
import React, { useState } from "react";
import { getReviewsByHotel } from "../Feedback/service/feedback-rest";
import { ShowReviews } from "./ShowReviews";

export const ReviewsManagement = ({ hotel }) => {
  const [reviews, setReviews] = useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const data = await getReviewsByHotel(hotel.id);
        console.log("data", data.reviews);
        setReviews(data.reviews);
      } catch (err) {
        console.log("err", err);
      }
    })();
  }, []);

  return (
    <>
      <h1>Reviews for Hotel - {hotel.name}</h1>

      <Grid container spacing={2}>
        {reviews.map((review) => (
          <Grid item md={3} key={review.id}>
            <ShowReviews review={review}></ShowReviews>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
