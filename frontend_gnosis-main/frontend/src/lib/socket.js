import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3005";

export function createSocket(user) {
  const socket = io(SOCKET_URL, {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    if (user?.id) {
      socket.emit("user:identify", {
        userId: user.id,
        username: user.username,
      });
    }
  });

  return socket;
}
