import { NextFunction, Request, Response } from "express";
import LoggerInstance from "../../loaders/logger"

export interface ApiError extends Error {
    message: string;
    statusCode?: number;
}

export const errorHandler = (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    LoggerInstance.error(error);
    res.status(error.statusCode ?? 500).json({
        success: false,
        message: error.message ?? 'SERVER_ERROR',
    });
} 