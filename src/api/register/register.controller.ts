import { Request, Response, NextFunction } from 'express';
import { attendStartService } from './register.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error);
    }
}