import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';


const SignUp = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState('');

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`http://localhost:8080/api/user/`, {firstName, lastName, email, phoneNumber, userName, password, gender})
    .then(response => {
        console.log(response);
        toast.success('Đăng ký thành công!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        navigate("/login");
      })
    .catch( error => {
      if (error.response && error.response.status === 400) {
        console.error('Bad request error. Response data:', error.response.data);
        toast.error(`${error.response.data}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      } 
      else {
          console.error('Error posting user:', error);
      }
      })
  };


  return (
      <div 
        style={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: "#162A28",
        padding: '50px'
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
            Đăng ký
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  InputLabelProps={{ style: { color: '#25C5AB' } }}
                  InputProps={{ style: { color: 'white' } }}
                  onChange={handleFirstNameChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  InputLabelProps={{ style: { color: '#25C5AB' } }}
                  InputProps={{ style: { color: 'white' } }}
                  onChange={handleLastNameChange}
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
                  InputLabelProps={{ style: { color: '#25C5AB' } }}
                  InputProps={{ style: { color: 'white' } }}
                  onChange={handleEmailChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  InputLabelProps={{ style: { color: '#25C5AB' } }}
                  InputProps={{ style: { color: 'white' } }}
                  onChange={handlePhoneChange}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset" fullWidth required>
                  <FormLabel component="legend" style={{ color: '#25C5AB' }}>Gender</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={handleGenderChange}
                    style={{ flexDirection: 'row' }}
                  >
                    <FormControlLabel value="male" control={<Radio />} label={<span style={{ color: '#25C5AB' }}>Male</span>} />
                    <FormControlLabel value="female" control={<Radio />} label={<span style={{ color: '#25C5AB' }}>Female</span>} />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  name="userName"
                  autoComplete="userName"
                  InputLabelProps={{ style: { color: '#25C5AB' } }}
                  InputProps={{ style: { color: 'white' } }}
                  onChange={handleUserNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  InputLabelProps={{ style: { color: '#25C5AB' } }}
                  InputProps={{ style: { color: 'white' } }}
                  onChange={handlePasswordChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor :'#25C5AB' }}
            >
              Đăng ký
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login">
                  Đăng nhập
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <ToastContainer/>
      </div>
  );
}


export default SignUp;