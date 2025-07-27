/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import envVars from "./app/config/env";
import { seedSupperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL as string);
    console.log("🚀 Connected to DB");

    server = app.listen(envVars.PORT, () => {
      console.log("Server is running on port", envVars.PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await startServer();
  await seedSupperAdmin();
})();

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received... Server shutting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received... Server shutting down..");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection detected... Server shutting down..", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception detected... Server shutting down..", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// Unhandier rejection error
// Promise.reject(new Error("I forgot to catch this promise"))

// Uncaught Exception Error
// throw new Error("I forgot to handle this local error")

/**
 * unhandled rejection error
 * uncaught rejection error
 * signal termination sigterm
 */
