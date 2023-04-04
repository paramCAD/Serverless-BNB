import { Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import FeedbackCard from "./FeedbackCard";

export const FeedbackList = ({ hotels }) => {

  const navigate = useNavigate()

  const checkAvailabilityHandler = (id) => {
    console.log(id);
    navigate(`/room/${id}`)
  };

  return (
    <Grid container spacing={2}>
      {hotels.map((itr) => (
        <Grid item md={4} key={itr.id}>
          <FeedbackCard
            details={itr}
            checkAvailability={checkAvailabilityHandler}
          />
        </Grid>
      ))}
    </Grid>
  );
};
