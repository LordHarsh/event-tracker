import { Router } from "express";
import { signup, login } from "./auth.controller";
import { validateRequest } from "../../shared/middlewares/valiator";
import { loginSchema, signupSchema } from "./auth.schema";

export default (): Router => {
  const router = Router();

  router.post("/signup", validateRequest("body", signupSchema), signup);
  router.post("/login", validateRequest("body", loginSchema), login);

  return router;
};
