import {Router} from "express";
import { validateRequest } from "../../shared/middlewares/valiator";
import { rsvpController } from "./rsvp.controller";
import { rsvpSchema } from "./rsvp.schema";
import { checkEvent } from "../../shared/middlewares/checkEvent";

export default (): Router => {
    const app = Router();
    app.get("/:eventName/:id", checkEvent, validateRequest('params', rsvpSchema), rsvpController);
    return app;
};