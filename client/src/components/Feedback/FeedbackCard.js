import React, { useEffect, useState } from "react";
// import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { grey, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, Rating, TextareaAutosize } from "@mui/material";
import { getRatingByHotel, saveReviews } from "./service/feedback-rest";
import { useNavigate } from "react-router-dom";

export default function FeedbackCard({ details, checkAvailability }) {
  const { id, name, location, image, description } = details;

  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();

  const checkRoomAvailability = (id) => {
    checkAvailability(id);
  };

  const submitFeedback = async () => {
    const user = await localStorage.getItem("user");
    const response = await saveReviews(
      user.id || "42d123ed-a727-416f-8daa-479055235101",
      id,
      feedback
    );
    console.log("response", response);
    setSubmit(!submit);
  };

  const goToCheckReviews = async () => {
    navigate(`/hotel/${id}/reviews`, {state: { hotel: details}});
  }

  React.useEffect(() => {
    (async () => {
      try {
        const data = await getRatingByHotel(id);
        setRating(data.rating);
      } catch (err) {
        console.log("err", err);
      }
    })();
  }, [submit]);

  return (
    <Card key={details.id} sx={{ backgroundColor: grey[100], height: "100%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {name && name.length > 0 ? name[0] : ""}
          </Avatar>
        }
        title={name}
        subheader={location}
      />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Rating
          defaultValue={0}
          value={rating || 0}
          precision={0.5}
          readOnly
        ></Rating>
        {description.map((itr, idx) => (
          <Typography
            key={`${details.id}-${idx}`}
            mt={idx === 0 ? 0 : 1}
            variant="body2"
            color="text.secondary"
          >
            {itr}
          </Typography>
        ))}
        <br/>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={3}
          placeholder="Write your feedback here."
          style={{ width: "100%" }}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </CardContent>
      <CardActions >
        <Box display={"flex"} justifyContent={"center"} p={2} width={"100%"} spacing={2}>
          <br />
          <Button
            variant="contained"
            aria-label="share"
            type="button"
            onClick={goToCheckReviews}
            style={{marginRight: 15}}
          >
            {" "}
            Check Reviews{" "}
          </Button>
          <Button
            variant="contained"
            aria-label="share"
            type="button"
            onClick={submitFeedback}
          >
            {" "}
            Submit Feedback{" "}
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
