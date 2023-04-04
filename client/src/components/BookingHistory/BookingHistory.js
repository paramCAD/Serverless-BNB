import { Box, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../UserAuthentication/service";
import BookingHistoryItem from "./BookingHistoryItem";
import { fetchHistory } from "./service/history-management-rest";

export const BookingHistory = () => {
  const { list, isFetching } = useSelector((state) => state.history.history);

  const dispatch = useDispatch();
  const user = getCurrentUser();

  useEffect(() => {
    dispatch(fetchHistory(user.username));
  }, [dispatch, user.username]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        History
      </Typography>
      {list.map((x) => (
        <Box mt={2}>
          <BookingHistoryItem details={x} />
        </Box>
      ))}
    </Container>
  );
};
