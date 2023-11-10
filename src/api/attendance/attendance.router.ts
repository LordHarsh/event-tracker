import {Router} from "express";
import { validateRequest } from "../../shared/middlewares/valiator";
import { attendStartSchema } from "./attendance.schema";
import { attendStart } from "./attendance.controller";

export default (): Router => {
    const app = Router();
    app.post('/attendStart', validateRequest('body', attendStartSchema), attendStart);
    app.get('/count', )
    return app;
};