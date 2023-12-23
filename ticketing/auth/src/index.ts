import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { singinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import mongoose from "mongoose";
import cookieSession from "cookie-session"; // now in res there is req.session property

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(singinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be define");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDb");
  } catch (err) {
    console.log("err", err);
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000!!!");
  });
};

start();
