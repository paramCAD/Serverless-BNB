import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import CribIcon from "@mui/icons-material/Crib";
import HotelIcon from "@mui/icons-material/Hotel";
import KingBedIcon from "@mui/icons-material/KingBed";
import KitchenIcon from "@mui/icons-material/Kitchen";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { grey, pink } from "@mui/material/colors";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTimestamp } from "../../../utils/date";
import Label from "../../../widgets/Label";
import Loader from "../../../widgets/Loader";
import { getCurrentUser } from "../../UserAuthentication/service";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  bookHotelRooms,
  fetchRoomsOfHotel,
} from "../service/hotel-management-rest";
import ConfirmBooking from "./ConfirmBooking";

const RoomManagement = () => {
  const now = new Date();

  const { id: hotelId } = useParams();
  const [startDate, setStartDate] = useState(now);
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(now.getDate() + 5))
  );

  const [bookingConfirmation, setBookingConfirmation] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState({});

  const { isFetching, list: rooms } = useSelector((state) => state.hotel.rooms);
  const { id: newRoomBookingRequest } = useSelector(
    (state) => state.hotel.booking
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchRoomsOfHotel({
        hotelId,
        startDate: getTimestamp(startDate),
        endDate: getTimestamp(endDate),
      })
    );
  }, [dispatch, hotelId, startDate, endDate, newRoomBookingRequest]);

  const bookRoom = (hotelId, roomId) => {
    const user = getCurrentUser();
    dispatch(
      bookHotelRooms({
        hotel_id: hotelId,
        room_id: roomId,
        user_id: user.username,
        start_date: getTimestamp(startDate),
        end_date: getTimestamp(endDate),
      })
    );
  };

  const onUserConfirmationHandler = (userResponse) => {
    setBookingConfirmation(false);
    if (userResponse) {
      bookRoom(hotelId, selectedRoom.id);
    }
  };

  const getStyles = () => {
    return { color: pink[500], fontSize: "xx-large" };
  };

  const roomTypeIcon = {
    single: <HotelIcon sx={getStyles()} />,
    double: <KingBedIcon sx={getStyles()} />,
    quad: (
      <>
        <KingBedIcon sx={getStyles()} />
        <KingBedIcon sx={getStyles()} />
      </>
    ),
    studio: (
      <>
        <KingBedIcon sx={getStyles()} />
        <CribIcon sx={getStyles()} />
        <KitchenIcon sx={getStyles()} />
      </>
    ),
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Rooms
      </Typography>
      {bookingConfirmation && (
        <ConfirmBooking
          askForConfirmation
          details={{ selectedRoom, startDate, endDate }}
          onUserConfirmation={onUserConfirmationHandler}
        />
      )}
      <Stack direction={"row"} justifyContent={"center"} spacing={2} mb={5}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            disablePast
            label="Start Date"
            openTo="day"
            views={["year", "month", "day"]}
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            minDate={new Date(new Date().setDate(startDate.getDate() + 1))}
            label="End Date"
            openTo="day"
            views={["year", "month", "day"]}
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        {/* <Button
          variant="contained"
          color="primary"
          onClick={() =>
            dispatch(fetchRoomsOfHotel(hotelId, startDate, endDate))
          }
        >
          <SearchIcon />
        </Button> */}
      </Stack>
      {isFetching ? (
        <Loader />
      ) : (
        <Grid container spacing={2}>
          {rooms.map((room) => (
            <Grid item md={4} key={room.id}>
              <Card sx={{ backgroundColor: grey[50] }}>
                <CardMedia
                  component="img"
                  height="256"
                  image={room.image}
                  alt="Paella dish"
                />

                <CardContent>
                  <Stack
                    p={2}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    spacing={1}
                  >
                    {roomTypeIcon[room.type]}
                  </Stack>

                  <Stack direction={"row"} justifyContent={"space-around"}>
                    <Stack direction={"row"} spacing={1}>
                      <Typography fontWeight={"bold"}>{"Type:"}</Typography>
                      <Typography>
                        {room.type[0].toUpperCase() + room.type.slice(1)}
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={1}>
                      <Typography fontWeight={"bold"}>{"$ "}</Typography>
                      <Typography>{room.price}</Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={1}>
                      <Typography fontWeight={"bold"}>{"# "}</Typography>
                      <Typography>{room.room_number}</Typography>
                    </Stack>
                  </Stack>
                </CardContent>

                <Stack
                  m={2}
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-around"}
                >
                  {room.status === "available" ? (
                    <>
                      <Label color="success">Available</Label>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setSelectedRoom(room);
                          setBookingConfirmation(true);
                        }}
                        startIcon={<BookmarkAddIcon />}
                      >
                        Book Now
                      </Button>
                    </>
                  ) : (
                    <>
                      <Label color="error">Occupied</Label>
                      <Button
                        variant="outlined"
                        startIcon={<NotificationsIcon />}
                      >
                        Notify
                      </Button>
                    </>
                  )}
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default RoomManagement;
