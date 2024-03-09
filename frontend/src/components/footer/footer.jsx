/* import * as React from 'react';
// import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <>
    <NavLink className={"Home"} to={"/contact"}>
    Contact Us
  </NavLink>
  <NavLink className={"Home"} to={"/about"}>
    About Us
  </NavLink>

    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
    </>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Footer() {
  return (
    <ThemeProvider theme={defaultTheme}>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">
              My sticky footer can be found here.
            </Typography>
            <Copyright />
          </Container>
        </Box>
      
    </ThemeProvider>
  );
} */
/* import * as React from 'react';
import { NavLink } from "react-router-dom";
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import SendIcon from '@mui/icons-material/Send';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';

export default function ColorInversionFooter() {
  const [color, setColor] = React.useState('neutral');
  return (
    <Sheet
      variant="solid"
      color={color}
      invertedColors
      sx={{
        ...(color !== 'neutral' && {
          bgcolor: `${color}.800`,
        }),
        flexGrow: 1,
        p: 2,
        borderRadius: { xs: 0, sm: 'sm' },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton
          variant="soft"
          size="sm"
          onClick={() => {
            const colors = ['primary', 'neutral', 'danger', 'success', 'warning'];

            const nextColorIndex = colors.indexOf(color) + 1;
            setColor(colors[nextColorIndex] ?? colors[0]);
          }}
        >
          <ColorLensRoundedIcon fontSize="small" />
        </IconButton>
        <Divider orientation="vertical" />
        <IconButton variant="plain">
          <FacebookRoundedIcon />
        </IconButton>
        <IconButton variant="plain">
          <GitHubIcon />
        </IconButton>
        <Input
          variant="soft"
          placeholder="Type in your email"
          type="email"
          name="email"
          endDecorator={
            <IconButton variant="soft" aria-label="subscribe">
              <SendIcon />
            </IconButton>
          }
          sx={{ ml: 'auto', display: { xs: 'none', md: 'flex' } }}
        />
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'flex-start' },
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Card
          variant="soft"
          size="sm"
          sx={{
            flexDirection: { xs: 'row', md: 'column' },
            minWidth: { xs: '100%', md: 'auto' },
            gap: 1,
          }}
        >
          <AspectRatio
            ratio="21/9"
            minHeight={80}
            sx={{ flexBasis: { xs: 200, md: 'initial' } }}
          >
            <img alt="" src="/static/blog/mui-product-comparison/ecosystem.png" />
          </AspectRatio>
          <CardContent>
            <Typography level="body-sm">Intro to the MUI ecosystem</Typography>
            <Typography level="body-xs">Blog post</Typography>
          </CardContent>
        </Card>
        <List
          size="sm"
          orientation="horizontal"
          wrap
          sx={{ flexGrow: 0, '--ListItem-radius': '8px', '--ListItem-gap': '0px' }}
        >
          <ListItem nested sx={{ width: { xs: '50%', md: 140 } }}>
            <ListSubheader sx={{ fontWeight: 'xl' }}>Sitemap</ListSubheader>
            <List>
              <ListItem>
                <ListItemButton>Services</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton><NavLink className={"Home"} to={"/contact"}>
    Contact Us
  </NavLink></ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton><NavLink className={"Home"} to={"/about"}>
    About Us
  </NavLink></ListItemButton>
              </ListItem>
              
  
              
            </List>
          </ListItem>
          <ListItem nested sx={{ width: { xs: '50%', md: 180 } }}>
            <ListSubheader sx={{ fontWeight: 'xl' }}>Products</ListSubheader>
            <List sx={{ '--ListItemDecorator-size': '32px' }}>
              <ListItem>
                <ListItemButton>Joy UI</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Base UI</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Material UI</ListItemButton>
              </ListItem>
            </List>
          </ListItem>
        </List>
      </Box>
    </Sheet>
  );
} */
import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import Input from "@mui/joy/Input";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import SendIcon from "@mui/icons-material/Send";
import ColorLensRoundedIcon from "@mui/icons-material/ColorLensRounded";
import { AppBar } from "@mui/material";
export default function ColorInversionFooter() {
  const [color, setColor] = React.useState("neutral");
  return (
    <>
      <AppBar position="sticky" sx={{ margin: "0 0 -20px 0" }}>
        <Sheet
          variant="solid"
          color={color}
          invertedColors
          sx={{
            ...(color !== "neutral" && {
              bgcolor: `${color}.800`,
            }),
            flexGrow: 1,
            p: 2,
            borderRadius: { xs: 0, sm: "sm" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              variant="soft"
              size="sm"
              onClick={() => {
                const colors = [
                  "primary",
                  "neutral",
                  "danger",
                  "success",
                  "warning",
                ];
                const nextColorIndex = colors.indexOf(color) + 1;
                setColor(colors[nextColorIndex] ?? colors[0]);
              }}
            >
              <ColorLensRoundedIcon fontSize="small" />
            </IconButton>
            <Divider orientation="vertical" />

            <IconButton variant="plain">
              <FacebookRoundedIcon />
            </IconButton>

            <IconButton variant="plain">
              <GitHubIcon />
            </IconButton>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { md: "flex-start" },
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {/* <Card
          variant="soft"
          size="sm"
          sx={{
            flexDirection: { xs: 'row', md: 'column' },
            minWidth: { xs: '100%', md: 'auto' },
            gap: 1,
            justifyContent: 'center', 
          }}
        > */}
            {/* <CardContent> */}
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 2 }}
            >
              {"Copyright © "}
              <Link color="inherit" href="https://mui.com/">
                Your Website
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
            {/* </CardContent> */}
            {/* </Card> */}
            <List
              size="sm"
              orientation="horizontal"
              wrap
              sx={{
                flexGrow: 0,
                "--ListItem-radius": "8px",
                "--ListItem-gap": "0px",
              }}
            >
              <ListItem nested sx={{ width: { xs: "50%", md: 140 } }}>
                <ListSubheader sx={{ fontWeight: "xl" }}>
                  Web Details
                </ListSubheader>
                <List>
                  <ListItem>
                    <ListItemButton>
                      <NavLink className={"Home"} to={"/contact"}>
                        Contact Us
                      </NavLink>
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>
                      <NavLink className={"Home"} to={"/about"}>
                        About Us
                      </NavLink>
                    </ListItemButton>
                  </ListItem>
                </List>
              </ListItem>
              <ListItem nested sx={{ width: { xs: "50%", md: 180 } }}>
                <ListSubheader sx={{ fontWeight: "xl" }}>
                  website created by{" "}
                </ListSubheader>
                <List>
                  <ListItem>
                    <ListItemButton>Ahmad Nassar</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>Kamal Lahloh</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>Osama Bani Melhem</ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton>Ra'fat Saqqa</ListItemButton>
                  </ListItem>
                </List>
              </ListItem>
            </List>
          </Box>
        </Sheet>
      </AppBar>
    </>
  );
}
