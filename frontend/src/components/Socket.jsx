import { useState, useEffect } from "react";
import socketInit from "./socket.server";
import Message from "./Message";

function Socket() {
  const [user_id, setUser_id] = useState("");
  const [token, setToken] = useState("");
  const [socket, setSocket] = useState(null);

  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // mount
    // in update body start second
    socket?.on("connect", () => {
      setIsConnected(true)
    });
    socket?.on("connect_error", (error) => {
      console.log(error.message);
      setIsConnected(false)
    });

    // will start in unmount remove from DOM
    // in update return start first
    return () => {
      socket?.close();
      socket?.removeAllListeners();
    };
  }, [socket]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>socket.io</h1>
        <input
          onChange={(e) => {
            setUser_id(e.target.value);
          }}
          type="text"
          placeholder="User id"
        />
        <input
          onChange={(e) => {
            setToken(e.target.value);
          }}
          type="text"
          placeholder="token"
        />

        <button
          onClick={() => {
            setSocket(
              socketInit({
                user_id,
                token,
              })
            );
          }}
        >
          Connect
        </button>
      </header>
      {socket && <Message socket={socket} user_id={user_id} />}
    </div>
  );
}

export default Socket;
