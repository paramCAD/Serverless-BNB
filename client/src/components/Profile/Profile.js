import * as React from 'react';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import  logo from '../Profile/user.png'

//Image reference:https://pixabay.com/vectors/avatar-people-person-business-user-3637561/
const Profile = () => {
  return (
    <div style={{ display:'flex', justifyContent:'center' }}>
    <Card sx={{ maxWidth: 345 }} align>
      <CardMedia
        component="img"
        height="500"
        image = {logo}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {localStorage.getItem("email")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          First Name: {localStorage.getItem("firstname")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Last Name: {localStorage.getItem("lastname")}
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
}

export default Profile;
