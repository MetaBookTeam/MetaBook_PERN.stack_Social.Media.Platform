const messageHandler = (socket, io) => {
    // event for message
    // on take callback
    socket.on("message", (data) => {
      console.log("message", data);
      data.success = true;
      // to send back the message for the user
      socket.to("room-" + data.to).emit("message", data);
      socket.emit("message", data);
    });
  };
  
  module.exports = messageHandler;
  