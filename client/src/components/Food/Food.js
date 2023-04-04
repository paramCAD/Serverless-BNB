import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/system';
import { Typography } from '@mui/material';
import axios from 'axios';
import {getCurrentUser} from '../UserAuthentication/service'


const Food = () => {
  const [checked, setChecked] = React.useState([]);

  const food_items = ["Pasta", "Noodles", "Sandwich", "Coke", "Soup"]

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const orderFood = async () => {

    const user_id = getCurrentUser()

    const my_order = {
      'dishes': checked,
      'user_id': user_id.username
    }
    

    axios.post(`https://us-central1-serverless-bnb.cloudfunctions.net/orderFood`, {my_order}, {headers: {'Content-Type':'application/json'}} )
      .then(res => {
        alert("Food oredered Successfully")
          
    })

    
  }

  return (
    <Container sx = {{justifyContent:"center"}}>
    <Stack direction="column" sx={{display: "flex", justifySelf:"center"}}>
      <Typography variant='h2' sx = {{justifySelf:"center"}}>FOOD</Typography>
      <hr/>
      <Typography variant='h6'>All Items $6. All Day, Everyday</Typography>
      <hr/>
    <List sx={{ bgcolor: 'background.paper' }}>
      {food_items.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem
            key={value}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(value)}
                checked={checked.indexOf(value) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    <Button variant="contained" onClick={orderFood}>Order</Button>
    </Stack>
    </Container>
  );
}

export default Food;
