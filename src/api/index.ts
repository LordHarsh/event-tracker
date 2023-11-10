import { Router } from "express";
import testRouter from "./test/test.router";

export default (): Router => {
    const app = Router();
    app.use('/test', testRouter());
    return app;
};