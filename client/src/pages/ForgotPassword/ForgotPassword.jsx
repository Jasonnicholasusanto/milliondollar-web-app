import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Contact from '../../components/Contact/Contact';
import './ForgotPassword.scss';
import { postForgotPassword } from '../../hooks/postForgotPassword';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        MillionDollarPosters
      </Link>{' '}
      {/* {new Date().getFullYear()} */}
      2023
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
    palette: {
        primary: {
        main: '#000000',
        darker: '#000000',
        },
        secondary: {
        main: '#ffffff',
        },
    },
});

export default function ForgotPassword() {

    const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');

    await postForgotPassword(email);
  };

  return (
    <div className="loginContainer">
        <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            
            <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            />

            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
           
                    <img style={{width: "50px", marginBottom: "30px"}} src="/img/$m-logo.png" alt="$M"/>

                    <Typography component="h1" variant="h5">
                        Forgot Password?
                    </Typography>

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        sx={{ width: '100%' }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        color={theme.darker}
                    >
                        Reset Password
                    </Button>

                    <Grid container>
                        <Grid item>
                        <Link href="/sign-in" variant="body2">
                            {"Remember your password?"}
                        </Link>
                        </Grid>
                    </Grid>
                    <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
        </ThemeProvider>

        <Contact className="contactContainer"/>
    </div>

  );
}