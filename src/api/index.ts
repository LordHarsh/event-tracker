import { Router } from "express";
import testRouter from "./test/test.router";
import attendanceRouter from "./attendance/attendance.router";
import registerRouter from "./register/register.router";
import { checkEvent } from "../shared/middlewares/checkEvent";

export default (): Router => {
    const app = Router();
    app.use('/test', testRouter());
    app.use('/:eventName/attandance', checkEvent, attendanceRouter());
    app.use('/:eventName/register', checkEvent, registerRouter());
    return app;
};