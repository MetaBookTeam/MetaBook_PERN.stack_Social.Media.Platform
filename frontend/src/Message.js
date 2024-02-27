import React, { useState, useEffect } from "react";

// in client we do 2 things
const Message = ({ socket, user_id }) => {
  const [allMessage, setAllMessage] = useState([]);
  // we listen to event
  useEffect(() => {
    socket.on("message", receveMessage);

    return () => {
      // Clear the event
      socket.off("message", receveMessage);
    };
  }, [allMessage]);
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    // we send to the server
    socket.emit("message", { to, from: user_id, message });
  };
  const receveMessage = (data) => {
    setAllMessage([...allMessage, data]);
  };
  return (
    <div>
      <h2>Message</h2>
      <input
        type="text"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        placeholder="Message"
      />
      <input
        onChange={(e) => {
          setTo(e.target.value);
        }}
        type="text"
        placeholder="to"
      />
      <button
        onClick={(e) => {
          sendMessage(e.target.value);
        }}
      >
        Send
      </button>
      {allMessage.length > 0 &&
        allMessage.map((message) => {
          return (
            <p>
              From: {message.from} Message: {message.message}
            </p>
          );
        })}
    </div>
  );
};

export default Message;
