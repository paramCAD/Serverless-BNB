import ConstructionIcon from "@mui/icons-material/Construction";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const TourManagement = () => {
  return (
    <Box
      display={"flex"}
      width="100%"
      flexDirection={"column"}
      justifyContent="center"
      alignItems={"center"}
    >
      <ConstructionIcon sx={{ fontSize: "8rem", mb: "2rem" }} />
      <Typography variant="h4"> Under Development </Typography>
    </Box>
  );
};

export default TourManagement;
