import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
function ChildModal({ socket, userId }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const auth = useSelector((state) => state.auth);
  const [allMessage, setAllMessage] = useState([]);
  useEffect(() => {
    socket.on("message", receveMessage);

    return () => {
      // Clear the event
      socket.off("message", receveMessage);
    };
  }, [allMessage]);
  const [to, setTo] = useState(userId);
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    // we send to the server
    socket.emit("message", { to, from: auth.userId, message });
  };
  const receveMessage = (data) => {
    setAllMessage([...allMessage, data]);
  };
  return (
    <div>
      <Button onClick={handleOpen}>Click To chat </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <h2 id="child-modal-title">
            <div>
              <h3>Message</h3>
              {allMessage.length > 0 &&
                allMessage.map((message) => {
                  return (
                    <p>
                      From: {message.from} Message: {message.message}
                    </p>
                  );
                })}
              <input
                type="text"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                placeholder="Message"
              />
            </div>
          </h2>
          <p id="child-modal-description">
            <Button
              onClick={(e) => {
                sendMessage(e.target.value);
              }}
            >
              Send
            </Button>
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default ChildModal;
