import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session";
import helmet from "helmet";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import envVars from "./app/config/env";
import "./app/config/passport";

const app = express();

// Basic security headers
app.use(helmet());

// Body parsing and cookie handling
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Secure and flexible session setup
app.use(
  expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    // },
  })
);

// Passport authentication
app.use(passport.initialize());
app.use(passport.session());

// CORS configuration (proper dynamic origin checking)
const allowedOrigins = [
  "http://localhost:3000",
  "https://www.shahmubaruk.com",
  "https://shahmubaruk.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Routes
app.use("/api/v1", router);

// Health check
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "🚀 Shah Mubarak server is up and running!",
    timestamp: new Date().toISOString(),
  });
});

// Error handlers
app.use(globalErrorHandler);
app.use(notFound);

export default app;
