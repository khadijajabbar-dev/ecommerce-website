import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

let socket;

// Returns a single shared socket instance (created lazily, not
// auto-connected — call socket.connect() when you actually need it).
export const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      auth: { token: localStorage.getItem("token") },
    });
  }
  return socket;
};
