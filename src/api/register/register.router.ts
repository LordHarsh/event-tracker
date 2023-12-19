import { Router } from "express";
import { validateRequest } from "../../shared/middlewares/valiator";
import { registerSchema } from "./register.schema";
import { register } from "./register.controller";
import { checkEvent } from "../../shared/middlewares/checkEvent";

export default (): Router => {
  const app = Router();

  app.post(
    "/:eventName",
    checkEvent,
    validateRequest("body", registerSchema),
    register
  );

  return app;
};
