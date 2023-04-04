import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ConfirmBooking({
  details,
  askForConfirmation,
  onUserConfirmation,
}) {
  const { selectedRoom: room } = details;
  const stayDuration =
    Math.round((new Date(details.endDate).getTime() -
      new Date(details.startDate).getTime()) /
    (1000 * 60 * 60 * 24));

  const [open, setOpen] = React.useState(askForConfirmation);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Room Booking Confirmation"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You are about to book one <b>{room.type}</b> room.
        </DialogContentText>
        <DialogContentText mt={1}>
          Stay duration is <b>{new Date(details.startDate).toDateString()}</b>{" "}
          to <b>{new Date(details.endDate).toDateString()}</b>{" "}
          <b>({stayDuration} days)</b>
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          Total cost of booking is <b>${room.price}</b> (rate per day) x <b>{stayDuration}</b> (total stay duration) ={" "}
          <b>${room.price * stayDuration}</b>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error"
          onClick={() => {
            onUserConfirmation(false);
          }}
        >
          No, I changed my mind
        </Button>
        <Button variant="contained"
          onClick={() => {
            onUserConfirmation(true);
          }}
          autoFocus
        >
          Yes, Pay
        </Button>
      </DialogActions>
    </Dialog>
  );
}
