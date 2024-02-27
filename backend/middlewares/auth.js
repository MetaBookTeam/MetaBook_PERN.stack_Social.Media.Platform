const socket = (socket, next) => {
  const headers = socket.handshake.headers; // user_id and token
  if (!headers.token) {
    next(new Error("invalid"));
  } else {
    // add new key in socket
    socket.join("room-" + headers.user_id);
    socket.user = { token: headers.token, user_id: headers.user_id };
    next();
  }
};
module.exports = socket;
