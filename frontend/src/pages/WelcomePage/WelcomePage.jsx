
 

/* 
import React from 'react';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import Grid from '@mui/material/Grid';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
};

const imageStyle = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
};

const textStyle = {
  textAlign: 'center',
};

function WelcomePage() {
  return (
    <div style={containerStyle}>
      <h1 style={{ ...textStyle, marginTop: 0 }}>Welcome to My Social Media App</h1>
      <Button variant="contained"><NavLink to="/users/login">Start</NavLink></Button>
      <Grid container spacing={3} style={textStyle}>
        <Grid item xs={3}>
          <img src="https://via.placeholder.com/150" alt="Kammal" style={imageStyle} />
          <p>Kammal</p>
        </Grid>
        <Grid item xs={3}>
          <img src="https://via.placeholder.com/150" alt="Saqqa" style={imageStyle} />
          <p>Saqqa</p>
        </Grid>
        <Grid item xs={3}>
          <img src="https://via.placeholder.com/150" alt="Nassarr" style={imageStyle} />
          <p>Nassarr</p>
        </Grid>
        <Grid item xs={3}>
          <img src="https://via.placeholder.com/150" alt="Osama" style={imageStyle} />
          <p>Osama</p>
        </Grid>
      </Grid>
    </div>
  );
}

export default WelcomePage;
 */


 
import React from 'react';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import Grid from '@mui/material/Grid';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
};

const imageStyle = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
};

const textStyle = {
  textAlign: 'center',
};

function WelcomePage() {
  return (
    <div style={containerStyle}>
      <div style={{ ...textStyle, position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)' }}>
        <h1>Welcome to My Social Media App</h1>
      </div>
      <Button variant="contained" size="large" style={{ marginTop: '20px' }}>
        <NavLink to="/users/login" style={{ textDecoration: 'none', color: 'inherit' }}>Start</NavLink>
      </Button>
      <Grid container spacing={3} style={textStyle}>
        <Grid item xs={3}>
          <img src="https://via.placeholder.com/150" alt="Kammal" style={imageStyle} />
          <p>Kammal</p>
        </Grid>
        <Grid item xs={3}>
          <img src="https://via.placeholder.com/150" alt="Saqqa" style={imageStyle} />
          <p>Saqqa</p>
        </Grid>
        <Grid item xs={3}>
          <img src="https://via.placeholder.com/150" alt="Nassarr" style={imageStyle} />
          <p>Nassarr</p>
        </Grid>
        <Grid item xs={3}>
          <img src="https://via.placeholder.com/150" alt="Osama" style={imageStyle} />
          <p>Osama</p>
        </Grid>
      </Grid>
    </div>
  );
}

export default WelcomePage; 

