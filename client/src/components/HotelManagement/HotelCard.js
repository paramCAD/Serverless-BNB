import * as React from "react";
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
import { Box, Button } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function HotelCard({ details, checkAvailability }) {
  const { name, location, image, description } = details;


  const checkRoomAvailability = (id) => {
    checkAvailability(id)
  }

  return (
    <Card key={details.id} sx={{ backgroundColor: grey[100], height: "100%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {name[0]}
          </Avatar>
        }
        title={name}
        subheader={location}
      />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent >
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
      </CardContent>
      <CardActions disableSpacing>
        <Box display={"flex"} justifyContent={"center"} p={2} width={"100%"}>
          <Button variant="contained" aria-label="share" onClick={() => checkRoomAvailability(details.id)}>
            {"Check availability"}
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
