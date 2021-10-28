import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { createNotification } from "../Notification";
import Axios from "axios";

Axios.defaults.withCredentials = true;
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        CodeLab
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp({ modalData, setIsEditOpen }) {
  console.log(modalData);
  document.title = "Edit User CodeLab";
  const [gender, setGender] = React.useState(modalData.gender);
  const [profession, setProfession] = React.useState(modalData.profession);
  const genderChangeHandler = (event) => {
    setGender(event.target.value);
  };
  const professionChangeHandler = (event) => {
    setProfession(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const data = {
      name: formData.get("name"),
      username: formData.get("username"),
      gender: formData.get("gender"),
      country: formData.get("country"),
      state: formData.get("state"),
      city: formData.get("city"),
      profession: formData.get("profession"),
      institute: formData.get("institute"),
      email: formData.get("email"),
    };
    console.log(data);
    Axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/edituser`, {
      data: { ...data },
    })
      .then((res) => {
        if (res.data.success === true) {
          setIsEditOpen(false);
          createNotification("Profile Updated Successfuly..", "success", 3000);
        } else {
          createNotification(res.data.err, "error", 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Profile
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="name"
                  defaultValue={modalData.name}
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  value={modalData.username}
                  label="username"
                  name="username"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  id="gender"
                  value={gender}
                  name="gender"
                  fullWidth
                  onChange={genderChangeHandler}
                >
                  <MenuItem id="male" value={"Male"}>
                    Male
                  </MenuItem>
                  <MenuItem id="female" value={"Female"}>
                    Female
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="country"
                  defaultValue={modalData.country}
                  label="Country"
                  name="country"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  defaultValue={modalData.state}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  defaultValue={modalData.city}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  id="profession"
                  value={profession}
                  fullWidth
                  onChange={professionChangeHandler}
                  name="profession"
                >
                  <MenuItem value={"Student"}>Student</MenuItem>
                  <MenuItem value={"Professional"}>Professional</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="institute"
                  label="Institute"
                  name="institute"
                  defaultValue={modalData.institute}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  defaultValue={modalData.email}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              id="signup-btn"
            >
              Save
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
