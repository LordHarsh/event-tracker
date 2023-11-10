import { Router } from "express";
import testRouter from "./test/test.router";
import attendanceRouter from "./attendance/attendance.router";
import registerRouter from "./register/register.router";

export default (): Router => {
    const app = Router();
    app.use('/test', testRouter());
    app.use('/attandance', attendanceRouter());
    app.use('/register', registerRouter;
    return app;
};