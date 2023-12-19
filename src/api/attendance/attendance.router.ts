import {Router} from "express";
import { validateRequest } from "../../shared/middlewares/valiator";
import { attendStartSchema } from "./attendance.schema";
import { attendStart, getCount } from "./attendance.controller";
import { checkEvent } from "../../shared/middlewares/checkEvent";

export default (): Router => {
    const app = Router();
    app.post('/start/:eventName', checkEvent, validateRequest('body', attendStartSchema), attendStart);
    app.get('/count/:eventName', checkEvent, getCount)
    return app;
};