import SearchOffIcon from "@mui/icons-material/SearchOff";
import { Badge, Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import React, { useState } from "react";

export default function ItemList({ list, onSelect }) {
  const [selectedId, updatedSelectedId] = useState(null);

  const onSelectItem = (id) => {
    updatedSelectedId(id);
    onSelect(id);
  };

  return (
    <>
      {list.length !== 0 ? (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {list.map((item, idx) => {
            return (
              <React.Fragment key={item.id+"-box"}>
                <ListItem
                  key={item.id}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: blue[50],
                    },
                    backgroundColor:
                      item.id === selectedId ? blue[50] : "white",
                  }}
                  alignItems="flex-start"
                  onClick={() => onSelectItem(item.id)}
                >
                  <ListItemAvatar>
                    <Badge
                      color={item.status === 1 ? "success" : "default"}
                      variant="dot"
                      component="div"
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                      overlap="circular"
                    >
                      <Avatar alt={item.name} src="dummy" />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.caption || item.name}
                    secondary={item.message}
                  />
                </ListItem>
                {idx !== list.length - 1 ? (
                  <Divider
                    key={item.id + "-divider"}
                    variant="inset"
                    component="li"
                  />
                ) : (
                  <></>
                )}
              </React.Fragment>
            );
          })}
        </List>
      ) : (
        <Box
          display={"flex"}
          width="100%"
          height="100%"
          flexDirection={"column"}
          justifyContent="center"
          alignItems={"center"}
        >
          <SearchOffIcon sx={{ fontSize: "5rem", mb: "1rem" }} />
          <Typography variant="h5"> No Result Found </Typography>
        </Box>
      )}
    </>
  );
}
