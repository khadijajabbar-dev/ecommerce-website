
import http from "http";
import app from "./app.js";
import connectDB from "./src/config/db.js";
import env from "./src/config/env.js";
import { initSocket } from "./src/socket/socket.js";

const startServer = async () => {
  try {
    await connectDB();

    // Create a raw HTTP server from the Express app so Socket.IO can
    // attach to the SAME server (instead of app.listen directly).
    const httpServer = http.createServer(app);

    // Attach Socket.IO for real-time seller order notifications
    initSocket(httpServer);

    httpServer.listen(env.PORT, () => {
      console.log(`ðŸš€ Server running on http://localhost:${env.PORT}`);
      console.log(`ðŸ”Œ Socket.IO ready for real-time connections`);
    });
  } catch (error) {
    console.log("Server Failed");
    console.log(error.message);
    process.exit(1);
  }
};

startServer();
