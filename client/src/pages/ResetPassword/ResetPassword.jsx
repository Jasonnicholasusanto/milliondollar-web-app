import * as React from 'react';
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
import './ResetPassword.scss';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
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

export default function ResetPassword() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (

    <div className="resetPassword">
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

                <img style={{width: "50px", marginBottom: "30px"}} src="favicon.ico" alt="logo"/>

                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email Address"
                    type="email"
                    id="email"
                    autoComplete="email"
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="new password"
                    label="New Password"
                    type="new password"
                    id="new password"
                    autoComplete="current-password"
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirm password"
                    label="Confirm Password"
                    type="confirm password"
                    id="confirm password"
                    autoComplete="current-password"
                />


                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, fontFamily: 'Roboto Mono, monospace' }}
                    color={theme.darker}
                >
                    Reset Password
                </Button>

                <Grid container>
                    <Grid item xs>
                    <Link href="/forgot-password" variant="body2">
                        Forgot password?
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link href="/sign-up" variant="body2">
                        {"Don't have an account? Sign Up"}
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