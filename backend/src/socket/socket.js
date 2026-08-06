import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import env from "../config/env.js";

let io;

// Real-time live stock + order notifications (chat removed)
export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: true,
      credentials: true,
    },
  });

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) {
        // Allow anonymous connections for public live stock updates
        socket.user = null;
        return next();
      }
      socket.user = jwt.verify(token, env.JWT_SECRET);
      next();
    } catch {
      socket.user = null;
      next();
    }
  });

  io.on("connection", (socket) => {
    if (socket.user?.id) {
      socket.join(`user:${socket.user.id}`);
      if (socket.user.role === "seller") socket.join(`seller:${socket.user.id}`);
    }

    socket.on("join-seller-room", (sellerId) => {
      if (!socket.user || socket.user.role !== "seller") return;
      if (String(sellerId) !== String(socket.user.id)) return;
      socket.join(`seller:${sellerId}`);
    });

    socket.on("disconnect", () => {});
  });

  return io;
};

export const getIO = () => io;
