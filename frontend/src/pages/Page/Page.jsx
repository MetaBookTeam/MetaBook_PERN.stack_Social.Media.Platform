import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
const Page = () => {
  return ( <>
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: '#cfe8fc', height: '200px' ,
    width:"100%"}} />
      </Container>
    </React.Fragment>
    <div>Page</div>
    </>
  )
}

export default Page