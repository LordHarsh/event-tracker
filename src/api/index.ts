import { Router } from "express";
import attendanceRouter from "./attendance/attendance.router";
import registerRouter from "./register/register.router";
import { checkEvent } from "../shared/middlewares/checkEvent";
import refreshRouter from "./refresh/refresh.router";
import rsvpRouter from "./rsvp/rsvp.router";

export default (): Router => {
    const app = Router();
    app.use('/:eventName/attendance', checkEvent, attendanceRouter());
    app.use('/:eventName/register', checkEvent, registerRouter());
    app.use('/:eventName/rsvp', checkEvent, rsvpRouter());
    app.use('/refresh', refreshRouter());
    return app;
};