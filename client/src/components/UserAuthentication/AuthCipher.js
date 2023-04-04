import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ShieldIcon from '@mui/icons-material/Shield';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Reference: https://github.com/mui/material-ui/blob/v5.8.6/docs/data/material/getting-started/templates/sign-in/SignIn.js

const theme = createTheme();

export default function AuthCipher({ setIsAuthenticated }) {

    const [challengeText, setChallengeText] = React.useState("");
    const [cipherKey, setCipherKey] = React.useState("");
    const [decodedKey, setDecodedKey] = React.useState("");

    let navigate = useNavigate();

    const getData = () => {
        const url = "https://us-central1-serverlessproj.cloudfunctions.net/getRandomStringAndUserKey";
        const email = localStorage.getItem('email');
        axios.post(url, { email: email }).then((response) => {
            console.log(response);
            setCipherKey(response.data.key);
            setChallengeText(response.data.word);
            localStorage.setItem('firstname', response.data.firstname);
            localStorage.setItem('lastname', response.data.lastname);
        }, (err) => {
            console.log(err);
        });
    }


    React.useEffect(() => {
        getData();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(cipherKey);
        console.log(decodedKey);
        console.log(challengeText)
        const url = "https://us-central1-serverlessproj.cloudfunctions.net/VerifyCipher";

        try {
            const response = await axios.post(url, { text: challengeText, key: cipherKey, answer: decodedKey });
            if (response.data === 'success') {
                // route to main page
                const email = localStorage.getItem('email');
                const url = "https://us-central1-serverlessproj.cloudfunctions.net/storeUserData";
                const response = await axios.post(url, { email: email });
                setIsAuthenticated(true);
                localStorage.setItem('isAuth', "true");
                navigate('/');
            }
            else {
                alert("Provided solution is wrong. Please check again")
            }
        }
        catch (err) {
            alert("Provided solution is wrong. Please check again")
        }

    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <ShieldIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Caesar Cipher (Case sensitive)
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Typography variant="subtitle1" gutterBottom component="div">Challenge Text: {challengeText}</Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="solution"
                            label="Solution"
                            name="solution"
                            autoFocus
                            value={decodedKey}
                            onChange={(event) => { setDecodedKey(event.target.value) }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
