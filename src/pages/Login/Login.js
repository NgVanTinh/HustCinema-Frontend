import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      userName: data.get('userName'),
      password: data.get('password'),
    });
    // login(data.get('userName'), data.get('password'));
    await axios.post(`http://localhost:8080/api/auth/login`, {userName: data.get('userName'), password: data.get('password')})
    .then(function (response) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                console.log(response.data.user);
                localStorage.setItem("token", response.data.token);

                navigate("/");
                
            })
            .catch(function (error) {
                console.log(error.response.data)

                toast.error(`${error.response.data}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            });
  };

  return (
    <>
     <div
      style={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: "#162A28"
      }}
     >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, backgroundColor: '#25C5AB' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: '#25C5AB' }}>
            Đăng nhập
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Username"
              name="userName"
              autoComplete="userName"
              autoFocus
              InputLabelProps={{ style: { color: '#25C5AB' } }}
              InputProps={{ style: { color: 'white' } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputLabelProps={{ style: { color: '#25C5AB' } }}
              InputProps={{ style: { color: 'white' } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#25C5AB' }}
            >
              Đăng nhập
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup">
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
     
  );
}

export default Login;