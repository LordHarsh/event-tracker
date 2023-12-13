import { Request, Response, NextFunction } from "express";
import { refreshMongo } from "./refresh.service";

export async function refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await refreshMongo();
    res.status(200).json({
        success: true,
        message: "Successfully refreshed",
    })
  } catch (error) {
    error.message = error.message + ". Reverting back to previous eventset configurations."
    next(error);
  }
}
