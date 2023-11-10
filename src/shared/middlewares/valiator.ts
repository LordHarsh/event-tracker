import { Request, Response, NextFunction } from "express";
import { z } from "zod";

type RequestLocation = "body" | "query" | "params";

export function validateRequest(location: RequestLocation, schema: z.AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedSchema = await schema.parseAsync(req[location]);
      req[location] = validatedSchema;
      next();
    } catch (error) {
      return res.status(400).json({ 
        success: false,
        error
       });
    }
  };
}