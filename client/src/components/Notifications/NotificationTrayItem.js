import { Box, IconButton, Stack, Typography } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import ReportIcon from "@mui/icons-material/Report";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { blue, green, orange, red } from "@mui/material/colors";

export default function NotificationTrayItem({
  id,
  type,
  title,
  message,
  created_on,
}) {
  const mildtone = (color) => color + "10";

  const iconMap = {
    danger: <ReportIcon />,
    warning: <WarningIcon />,
    info: <InfoIcon />,
    success: <CheckCircleIcon />,
  };

  const colorMap = {
    danger: red[700],
    warning: orange[700],
    info: blue[700],
    success: green[500],
  };

  return (
    <Stack
      flexDirection="row"
      cursor="default"
      sx={{
        backgroundColor: mildtone(colorMap[type]),
        borderTopRightRadius: "10px",
        borderTopLeftRadius: "10px",
        marginTop: "1px",
        p: 1,
        borderBottomWidth: "2px",
        borderBottomStyle: "solid",
        borderBottomColor: colorMap[type],
      }}
      key={id}
    >
      <Box
        display={"flex"}
        minWidth="70px"
        justifyContent="center"
        alignItems="center"
      >
        <IconButton sx={{ color: colorMap[type] }}>{iconMap[type]}</IconButton>
      </Box>
      <Box>
        <Typography fontWeight="bold" fontSize="md">
          {title}
        </Typography>
        <Typography fontSize="sm" >{message}</Typography>
        <Typography
          marginTop={"5px"}
          marginRight={"5px"}
          align={"right"}
          fontStyle={"italic"}
          fontSize={"smaller"}
        >
          {new Date(created_on).toUTCString()}
        </Typography>
      </Box>
    </Stack>
  );
}
