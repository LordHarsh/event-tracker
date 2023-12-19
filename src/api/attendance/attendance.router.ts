import {Router} from "express";
import { validateRequest } from "../../shared/middlewares/valiator";
import { attendStartSchema } from "./attendance.schema";
import { attendStart, getCount } from "./attendance.controller";
import { checkEvent } from "../../shared/middlewares/checkEvent";
import authenticateToken from "../../shared/middlewares/authenticate";
import isMember from "../../shared/middlewares/isMember";

export default (): Router => {
    const app = Router();
    app.post('/start/:eventName', checkEvent, authenticateToken(), isMember(), validateRequest('body', attendStartSchema), attendStart);
    app.get('/count/:eventName', checkEvent, authenticateToken(), isMember(), getCount)
    return app;
};