import { Router } from "express";
import attendanceRouter from "./attendance/attendance.router";
import registerRouter from "./register/register.router";
import { checkEvent } from "../shared/middlewares/checkEvent";
import rsvpRouter from "./rsvp/rsvp.router";
import authRouter from "./auth/auth.router";
import eventRouter from "./event/event.router";
import userRouter from "./user/user.router";

export default (): Router => {
  const app = Router();
  app.use("/auth", authRouter());
  app.use("/event", eventRouter());
  app.use("/user", userRouter());
  app.use("/attendance", attendanceRouter());
  app.use("/register", registerRouter());
  app.use("/rsvp", checkEvent, rsvpRouter());
  return app;
};
