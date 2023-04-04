import React, {useState} from "react";
import awsCognitoCredentials from "./CognitoCredentials";
import {CognitoUserPool} from "amazon-cognito-identity-js";
import {useNavigate} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import ShieldIcon from "@mui/icons-material/Shield";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


// Reference: https://github.com/mui/material-ui/blob/v5.8.6/docs/data/material/getting-started/templates/sign-in/SignIn.js

const theme = createTheme();

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastName] = useState("");
    const [error, setError] = useState("");
    const userPool = new CognitoUserPool(awsCognitoCredentials);

    function onSubmit(event) {
        event.preventDefault();
        //referenced from https://www.youtube.com/watch?v=8WZmIdXZe3Q&t=9s
        userPool.signUp(email, password, null, null, (err, data) => {
            if (err) {
                setError(err.message);
                console.log(err)
            } else {
                navigate("/securityQuestion", {state: {email, firstname, lastname}})
            }
        })
    }

    return (

        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <ShieldIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box component="form" onSubmit={onSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="First Name"
                            name="firstname"
                            type="firstname"
                            autoComplete="firstname"
                            autoFocus
                            value={firstname}
                            onChange={(event) => setFirstname(event.target.value)}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Last Name"
                            name="lastname"
                            type="lastname"
                            autoComplete="lastname"
                            autoFocus
                            value={lastname}
                            onChange={(event) => setLastName(event.target.value)}

                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email id"
                            name="email"
                            type="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}

                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete="password"
                            autoFocus
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <Typography variant="subtitle1" gutterBottom component="div">{error}</Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Register
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Register;