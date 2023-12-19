import { Router } from "express";
import attendanceRouter from "./attendance/attendance.router";
import registerRouter from "./register/register.router";
import { checkEvent } from "../shared/middlewares/checkEvent";
import refreshRouter from "./refresh/refresh.router";
import rsvpRouter from "./rsvp/rsvp.router";
import authRouter from "./auth/auth.router";

export default (): Router => {
  const app = Router();
  app.use("/refresh", refreshRouter());
  app.use("/auth", authRouter());
  app.use("/attendance", attendanceRouter());
  app.use("/register", registerRouter());
  app.use("/rsvp", checkEvent, rsvpRouter());
  return app;
};
