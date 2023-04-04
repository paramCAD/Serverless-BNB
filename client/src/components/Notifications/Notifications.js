import { Divider, Stack, Typography } from "@mui/material";
import NotificationTrayItem from "./NotificationTrayItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchNotifications } from "./services/notification-rest";
import { getCurrentUser } from "../UserAuthentication/service";
import Loader from "../../widgets/Loader";

export const Notifications = () => {
  const dispatch = useDispatch();
  const { list, isFetching } = useSelector((state) => state.notification.data);
  const user = getCurrentUser();

  useEffect(() => {
    dispatch(fetchNotifications(user.username));
  }, [dispatch, user.username]);

  return (
    <Stack width={400} alignItems={"center"}>
      <Typography variant="h4" mt={10}>
        Notifications ({list.length})
      </Typography>
      <Stack mt={2} spacing={1}>
        
        {isFetching ? <Loader /> : list.map((x) => (
          <>
            <NotificationTrayItem
              key={x.id}
              title={x.title}
              message={x.message}
              type={"success"}
              created_on={parseInt(x.created_on)}
            />
          </>
        ))}
      </Stack>
    </Stack>
  );
};
