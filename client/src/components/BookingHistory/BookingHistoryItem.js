import { Box, CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";

export default function BookingHistoryItem({ details }) {
  const { room, hotel } = details;

  const stayDuration = Math.round(
    (details.end_date - details.start_date) / (1000 * 60 * 60 * 24)
  );

  return (
    <Card>
      <CardActionArea>
        <Box display={"flex"} direction={"row"}>
          <CardMedia
            component="img"
            sx={{ width: "512px" }}
            image={room.image}
            alt="green iguana"
          />
          <CardContent>
            <Typography>
              <b>Hotel: </b> {hotel.name}
            </Typography>
            <Typography>
              <b>Room: </b> {room.type[0].toUpperCase() + room.type.slice(1)}
            </Typography>
            <Typography mt={1}>
              <b>Booked On: </b> {new Date(details.booked_on).toDateString()}
            </Typography>
            <Typography mt={1}>
              Stay duration is{" "}
              <b>{new Date(details.start_date).toDateString()}</b> to{" "}
              <b>{new Date(details.end_date).toDateString()}</b>{" "}
              <b>({stayDuration} days)</b>
            </Typography>
            <Typography id="alert-dialog-description">
              Total cost of booking is <b>${room.price}</b> (rate per day) x{" "}
              <b>{stayDuration}</b> (total stay duration) ={" "}
              <b>${room.price * stayDuration}</b>
            </Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
}
