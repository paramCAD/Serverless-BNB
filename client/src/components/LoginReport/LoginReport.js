import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import axios from "axios";
import moment from "moment";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Divider from "@mui/material/Divider";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import Loader from "../../widgets/Loader";

const LoginReport = () => {
  const [loginTime, setLoginTime] = React.useState([]);

  const getData = async () => {
    const email = localStorage.getItem("email");
    const url =
      "https://us-central1-serverlessproj.cloudfunctions.net/getUserData";
    const response = await axios.post(url, { email: email });

    var timestamps = [];

    for (let i = 0; i < response.data.length; i++) {
      timestamps.push(
        moment(response.data[i]).format("MMMM Do YYYY, h:mm:ss a")
      );
    }
    setLoginTime(timestamps.sort().reverse());
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {loginTime.length === 0 ? (
        <Loader />
      ) : (
        loginTime.map((time, index) => (
          <List>
            <ListItem button>
              <WatchLaterIcon color="primary" />
              <ListItemText primary="Time" />
              <ListItemSecondaryAction>
                <Typography color="textSecondary" variant="body2">
                  {time}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </List>
        ))
      )}
    </div>
  );
};

export default LoginReport;
