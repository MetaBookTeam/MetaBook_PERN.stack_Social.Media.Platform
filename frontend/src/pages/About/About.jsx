import React from 'react';
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
const About = () => {
  const linkStyle = {
    textDecoration: 'none', // Remove underline decoration
    color: 'inherit', // Inherit text color from parent
  };

  return (
    <div style={containerStyle}>
      <div style={{ ...textStyle, position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)' }}>
        <h1>Welcome to My Social Media App</h1>
      </div>
      
      <Grid container spacing={3} style={textStyle}>
        <Grid item xs={3}>
          <img src='/photos/kammal.jpeg' style={imageStyle} />
          <p>Kammal Full-Stack web depeloper</p>
          <p><a href='https://www.github.com' style={linkStyle}>Click!!</a></p>
        </Grid>
        <Grid item xs={3}>
          <img src="/photos/saqqa.jpeg" alt="Saqqa" style={imageStyle} />
          <p>Saqqa Full-Stack web depeloper</p>
          <p><a href='https://www.github.com' style={linkStyle}>Click!!</a></p>
        </Grid>
        <Grid item xs={3}>
          <img src="/photos/nassarr.jpeg" alt="Nassarr" style={imageStyle} />
          <p>Nassarr Full-Stack web depeloper</p>
          <p><a href='https://www.github.com' style={linkStyle}>Click!!</a></p>
        </Grid>
        <Grid item xs={3}>
          <img src="/photos/osama.jpeg" alt="Osama" style={imageStyle} />
          <p>Osama Full-Stack web depeloper</p>
          <p><a href='https://www.github.com' style={linkStyle}>Click!!</a></p>
        </Grid>
      </Grid>
    </div>
  );
}

export default About;
