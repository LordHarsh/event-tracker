import {Router} from "express";
import { validateRequest } from "../../shared/middlewares/valiator";
import { rsvpController } from "./rsvp.controller";
import { rsvpSchema } from "./rsvp.schema";

export default (): Router => {
    const app = Router();
    app.get("/:id", validateRequest('params', rsvpSchema), rsvpController);
    return app;
};