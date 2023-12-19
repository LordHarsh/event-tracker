import { Request, Response, NextFunction } from "express";
import { signupService, loginService } from "./auth.service";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await signupService(req.body);
    res.status(200).json({ success: true, message: "Signup successful" });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await loginService(req.body);
    res.status(200).json({ success: true, message: "Login successful", data });
  } catch (error) {
    next(error);
  }
};
