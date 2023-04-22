import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './ProfileEdit.scss';

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

const ProfileEdit = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form with updated profile data
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <Container maxWidth="sm">
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Edit Profile
                        </Typography>
                    </Box>
                    
                    <Grid container spacing={2}>
                    
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="firstName"
                                name="firstName"
                                label="First name"
                                fullWidth
                                autoComplete="given-name"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="lastName"
                                name="lastName"
                                label="Last name"
                                fullWidth
                                autoComplete="family-name"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                id="username"
                                name="username"
                                label="Username"
                                fullWidth
                                autoComplete="username"
                                />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                id="email"
                                name="email"
                                label="Email address"
                                fullWidth
                                autoComplete="email"
                                />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="profileDescription"
                                name="profileDescription"
                                label="Profile Status"
                                multiline
                                fullWidth
                                rows={4}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <Button variant="contained" color="primary">
                                Save Changes
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default ProfileEdit;