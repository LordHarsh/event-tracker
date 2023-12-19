import {Router} from "express";
import { validateRequest } from "../../shared/middlewares/valiator";
import { registerSchema } from "./register.schema";
import { onspotRegister, register } from "./register.controller";
import { checkEvent } from "../../shared/middlewares/checkEvent";

export default (): Router => {
    const app = Router();
    app.post("/:eventName", checkEvent, validateRequest('body', registerSchema), register);
    app.post("/onspot/:eventName", checkEvent, validateRequest('body', registerSchema), onspotRegister);
    return app;
};