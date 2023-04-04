import React, { useEffect, useState } from "react";
// import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { grey, red } from "@mui/material/colors";
import { CardActions } from "@mui/material";

export const ShowReviews = ({ review }) => {

    useEffect(()=>{
        console.log("REV",review);
    }, []);

  return (
    <Card key={review.id} sx={{ backgroundColor: grey[100], height: "100%" }}>
      <CardHeader
        title={review.polarity}
        subheader={"RATING SCORE (0 to 5) " + parseFloat(review.score).toFixed(2)}
      />
      <CardContent>
        {review.review}
      </CardContent>
      <CardActions>
        {/* Text */}
      </CardActions>
    </Card>
  );
}
