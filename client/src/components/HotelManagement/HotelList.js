import { Grid } from "@mui/material";
import React from "react";
import HotelCard from "./HotelCard";
import { useNavigate } from "react-router-dom";

export const HotelList = ({ hotels }) => {

  const navigate = useNavigate()

  const checkAvailabilityHandler = (id) => {
    console.log(id);
    navigate(`/room/${id}`)
  };

  return (
    <Grid container spacing={2}>
      {hotels.map((itr) => (
        <Grid item md={4} key={itr.id}>
          <HotelCard
            details={itr}
            checkAvailability={checkAvailabilityHandler}
          />
        </Grid>
      ))}
    </Grid>
  );
};
