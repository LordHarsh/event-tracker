import {Router} from "express";
import { validateRequest } from "../../shared/middlewares/valiator";
import { registerSchema } from "./register.schema";
import { register } from "./register.controller";

export default (): Router => {
    const app = Router();
    app.post("/", validateRequest('body', registerSchema), register);
    return app;
};