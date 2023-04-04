import { Box, Grid, Typography } from "@mui/material";

const ComponentLayout = ({ title, children }) => {
  return (
    <>
      <Grid item md={12} sm={12} sx={{ height: "10%", maxHeight: "10%" }}>
        <Box display="flex" alignItems="center" height="100%">
          <Typography
            variant={"h4"}
            fontWeight={"bold"}
            sx={{
              textAlign: "left",
              ml: { sm: "20px", md: "40px" },
            }}
          >
            {" "}
            {title}{" "}
          </Typography>
        </Box>
      </Grid>
      <Grid
        container
        item
        md={12}
        sm={12}
        sx={{ height: "90%", maxHeight: "90%" }}
      >
        {children}
      </Grid>
    </>
  );
};

export default ComponentLayout;
