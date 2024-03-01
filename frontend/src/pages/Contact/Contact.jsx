import React from "react";
import { useState, useRef } from "react";

import emailjs from "@emailjs/browser";

import { TextField, Button, Typography, Box } from "@mui/material";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_metabook",
        "template_default",
        form.current,
        "imxMPP85b38jhSM5z"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [message, setMessage] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   //
  // };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
        <Typography variant="h4" align="center" mb={2}>
          Contact Us
        </Typography>
        <form ref={form} onSubmit={sendEmail}>
          {/* <input type="text" name="user_name" /> */}

          <TextField
            fullWidth
            label="Name"
            name="user_name"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="user_email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Message"
            // value={message}
            // onChange={(e) => setMessage(e.target.value)}
            margin="normal"
            required
            multiline
            rows={4}
            name="message"
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Contact;
