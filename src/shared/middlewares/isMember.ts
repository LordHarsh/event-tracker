import { NextFunction, Request, Response } from "express";

export default function isMember() {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (res.locals.user.permissons !== "member") {
        throw { statusCode: 401, message: "Unauthorized" };
      }
      next();
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  };
}
