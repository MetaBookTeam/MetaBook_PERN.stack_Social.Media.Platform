
//  import { useState } from "react";
//  import * as React from 'react';
//  import AspectRatio from '@mui/joy/AspectRatio';
//  import Avatar from '@mui/joy/Avatar';
//  import Box from '@mui/joy/Box';
//  import Card from '@mui/joy/Card';
//  import CardContent from '@mui/joy/CardContent';
//  import CardOverflow from '@mui/joy/CardOverflow';
//  import Link from '@mui/joy/Link';
//  import IconButton from '@mui/joy/IconButton';
//  import Input from '@mui/joy/Input';
//  import Typography from '@mui/joy/Typography';
//  import MoreHoriz from '@mui/icons-material/MoreHoriz';
//  import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
//  import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
//  import SendOutlined from '@mui/icons-material/SendOutlined';
//  import Face from '@mui/icons-material/Face';
//  import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';

// import { useDispatch, useSelector } from "react-redux";
// import {
//   setPosts,
//   addPost,
// } from "../../Service/redux/reducers/Posts/postsSlice";

// const Post = ({ post }) => {
//   // useDispatch allows us to dispatch actions to the reducers
//   const dispatch = useDispatch();
//   // useSelector gives us access to the store
//   const posts = useSelector((state) => state.posts.posts);

//   return (

//     <Card
//           variant="outlined"
//           sx={{
//             minWidth: 300,
//             '--Card-radius': (theme) => theme.vars.radius.xs,
//           }}
//         >
//           <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
//             <Box
//               sx={{
//                 position: 'relative',
//                 '&::before': {
//                   content: '""',
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   bottom: 0,
//                   right: 0,
//                   m: '-2px',
//                   borderRadius: '50%',
//                   background:
//                     'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
//                 },
//               }}
//             >
//               <Avatar
//                 size="sm"
//                 src="/static/logo.png"
//                 sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
//               />
//             </Box>
//             <Typography fontWeight="lg">{post.user_id}</Typography>
//             <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
//               <MoreHoriz />
//             </IconButton>
//           </CardContent>
//           <CardOverflow>
//             <AspectRatio>
//               <img src={post.photo_url} alt="" loading="lazy" />
//             </AspectRatio>
//           </CardOverflow>
//           <CardContent orientation="horizontal" sx={{ alignItems: 'center', mx: -1 }}>
//             <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
//               <IconButton variant="plain" color="neutral" size="sm">
//                 <FavoriteBorder />
//               </IconButton>
//               <IconButton variant="plain" color="neutral" size="sm">
//                 <ModeCommentOutlined />
//               </IconButton>
//               <IconButton variant="plain" color="neutral" size="sm">
//                 <SendOutlined />
//               </IconButton>
//             </Box>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mx: 'auto' }}>
//               {[...Array(5)].map((_, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     borderRadius: '50%',
//                     width: `max(${6 - index}px, 3px)`,
//                     height: `max(${6 - index}px, 3px)`,
//                     bgcolor: index === 0 ? 'primary.solidBg' : 'background.level3',
//                   }}
//                 />
//               ))}
//             </Box>
//             <Box sx={{ width: 0, display: 'flex', flexDirection: 'row-reverse' }}>
//               <IconButton variant="plain" color="neutral" size="sm">
//                 <BookmarkBorderRoundedIcon />
//               </IconButton>
//             </Box>
//           </CardContent>
//           <CardContent>
//             <Link
//               component="button"
//               underline="none"
//               fontSize="sm"
//               fontWeight="lg"
//               textColor="text.primary"
//             >
//               {post.likes} Likes
//             </Link>
//             <Typography fontSize="sm">
//               <Link
//                 component="button"
//                 color="neutral"
//                 fontWeight="lg"
//                 textColor="text.primary"
//               >
                
//               </Link>{' '}
//               {post.content}
//             </Typography>
//             <Link
//               component="button"
//               underline="none"
//               fontSize="sm"
//               startDecorator="…"
//               sx={{ color: 'text.tertiary' }}
//             >
//               more
//             </Link>
//             <Link
//               component="button"
//               underline="none"
//               fontSize="10px"
//               sx={{ color: 'text.tertiary', my: 0.5 }}
//             >
//               {post.created_at} DAYS AGO
//             </Link>
//           </CardContent>
//           <CardContent orientation="horizontal" sx={{ gap: 1 }}>
//             <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
//               <Face />
//             </IconButton>
//             <Input
//               variant="plain"
//               size="sm"
//               placeholder="Add a comment…"
//               sx={{ flex: 1, px: 0, '--Input-focusedThickness': '0px' }}
//             />
//             <Link disabled underline="none" role="button">
//               Post
//             </Link>
//           </CardContent>
//         </Card>
//   )

// };

// export default Post;


/* eslint-disable jsx-a11y/anchor-is-valid */
import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
const Post = () => {
  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="John Doe"
        subheader="September 14, 2022"
      />
      <CardMedia
        component="img"
        height="20%"
        image="https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;