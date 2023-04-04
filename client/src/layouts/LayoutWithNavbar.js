import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const LayoutWithNavbar = ({ setIsAuthenticated }) => {
  return (
    <Box display={"flex"} sx={{ height: "100%", width: "100%" }}>
      <Navbar setIsAuthenticated={setIsAuthenticated} />
      <Box mt={10} flexGrow={1} >
        <Outlet />
      </Box>
    </Box>
  );
};

export default LayoutWithNavbar;
