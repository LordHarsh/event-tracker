import {Router} from "express";
import { validateRequest } from "../../shared/middlewares/valiator";
import { attendStartSchema } from "./attendance.schema";
import { attendStart, getCount } from "./attendance.controller";

export default (): Router => {
    const app = Router();
    app.post('/start', validateRequest('body', attendStartSchema), attendStart);
    app.get('/count', getCount)
    return app;
};