import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { HotelList } from "./HotelList";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchHotels } from "./service/hotel-management-rest";
import Loader from "../../widgets/Loader";

export const HotelManagement = () => {

  const { isFetching, list: hotels } = useSelector(state => state.hotel.hotel)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchHotels())
  },[dispatch])

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hotels
      </Typography>

      {isFetching ? <Loader /> : 
      <Stack>
        <Box>
          <TextField
            fullWidth
            id="hotel-search-bar"
            label="Search Hotel"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mt={5}>
          <HotelList hotels={hotels} />
        </Box>
      </Stack>}
    </Container>
  );
};
