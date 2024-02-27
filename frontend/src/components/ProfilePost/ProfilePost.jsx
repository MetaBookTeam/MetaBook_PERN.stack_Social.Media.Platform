import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import Face from "@mui/icons-material/Face";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Comments from "../../pages/Comments/Comments";
import { styled } from "@mui/material/styles";
function ProfilePost({ elem }) {
  return (
    <Card
      variant="outlined"
      sx={{
        marginBlock: "10px",
        minWidth: 300,
        "--Card-radius": (theme) => theme.vars.radius.xs,
      }}
    >
      <CardContent
        orientation="horizontal"
        sx={{ alignItems: "center", gap: 1 }}
      >
        <Box
          sx={{
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              m: "-2px",
              borderRadius: "50%",
              background:
                "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
            },
          }}
        >
          <Avatar size="sm" src={elem.image} />
        </Box>
        <Typography fontWeight="lg">{elem.user_name}</Typography>
        <br />

        <Link
          component="button"
          underline="none"
          fontSize="10px"
          sx={{ color: "text.tertiary", my: 0.5, ml: "auto" }}
        >
          {new Date(elem.created_at).toLocaleString()}
        </Link>
      </CardContent>

      {elem.photo_url && (
        <CardOverflow>
          <AspectRatio>
            <img src={elem.photo_url} alt="" loading="lazy" />
          </AspectRatio>
        </CardOverflow>
      )}

      <CardContent>
        <Typography fontSize="sm" marginBottom={2}>
          <Link
            component="button"
            color="neutral"
            fontWeight="lg"
            textColor="text.primary"
          ></Link>{" "}
          {elem.content}
        </Typography>
        {/* </Paper> */}
        <hr />
        <Comments post={elem} />
      </CardContent>
    </Card>
  );
}

export default ProfilePost;
