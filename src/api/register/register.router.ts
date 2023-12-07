import {Router} from "express";
import { validateRequest } from "../../shared/middlewares/valiator";
import { registerSchema } from "./register.schema";
import { onspotRegister, register } from "./register.controller";

export default (): Router => {
    const app = Router();
    app.post("/:eventName", validateRequest('body', registerSchema), register);
    app.post("/:eventName/onspot", validateRequest('body', registerSchema), onspotRegister);
    return app;
};