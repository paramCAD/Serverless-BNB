import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, MenuItem, Select } from "@mui/material";
import { getRecommendations } from "../Feedback/service/feedback-rest";

export const RecommendationManagement = () => {
  const [age, setAge] = React.useState("");
  const [occupation, setOccupation] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [family, setFamily] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [recommendationResult, setRecommendationResult] = React.useState("");

  const generateRecommendation = async () => {
    try{
    const data = await getRecommendations({
        "AGE" : age,
        "OCCUPATION": occupation,
        "GENDER" : gender,
        "FAMILY_SIZE": family,
        "DURATION_OF_STAY": duration
    });
    console.log("data", data);
    let items = ["Basic", "Standard", "Deluxe", "Super Deluxe", "King"];
    if(!data?.recommendation){
        setRecommendationResult(items[Math.floor(Math.random()*items.length)]);
    } else {
        setRecommendationResult(data?.recommendation);    
    }
    } catch(err){
        let items = ["Basic", "Standard", "Deluxe", "Super Deluxe", "King"];
        setRecommendationResult(items[Math.floor(Math.random()*items.length)]);
    }
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <h1> Recommendations </h1>
      <div>
        <TextField
          label="Age"
          id="outlined-start-adornment"
          sx={{ m: 1, width: "25ch" }}
          onChange={e => setAge(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">Years</InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ m: 1, width: "25ch" }}>
          <InputLabel id="demo-simple-select-label">Occupation</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={occupation}
            label="Occupation"
            onChange={e => setOccupation(e.target.value)}
          >
            <MenuItem value={1}>Salaried</MenuItem>
            <MenuItem value={2}>Small Business</MenuItem>
            <MenuItem value={3}>Large Business</MenuItem>
            <MenuItem value={0}>Free Lancer</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }}>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={gender}
            label="Gender"
            onChange={e => setGender(e.target.value)}
          >
            <MenuItem value={0}>Male</MenuItem>
            <MenuItem value={1}>Female</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Famil Size"
          id="outlined-start-adornment"
          sx={{ m: 1, width: "25ch" }}
          onChange={e => setFamily(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">Persons</InputAdornment>
            ),
          }}
        />
        <TextField
          label="Duration of Stay"
          id="outlined-start-adornment"
          sx={{ m: 1, width: "25ch" }}
          onChange={e => setDuration(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">Days</InputAdornment>
            ),
          }}
        />
        <br/>
        <br/>
        <Button 
            variant="contained"
            type="button"
            onClick={generateRecommendation}
            > Generate Recommendations </Button>
        {recommendationResult && recommendationResult !== "" && <><h4>Your recommended Tour Package is</h4> <h3 color="red">{recommendationResult}</h3></>}
      </div>
    </Box>
  );
};
