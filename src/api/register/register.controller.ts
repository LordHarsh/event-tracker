import { Request, Response, NextFunction } from 'express';
import { registerService } from './register.service';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, name, registrationNumber, branch, mobile } = req.body;
        const event = res.locals.event;
        await registerService(email, name, registrationNumber, branch, mobile, event);
        res.status(200).json({
            success: true,
            message: "Successfully registered",
        });
    } catch (error) {
        next(error);
    }
}

