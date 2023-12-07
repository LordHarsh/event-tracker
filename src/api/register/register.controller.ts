import { Request, Response, NextFunction } from 'express';
import { onspotRegisterService, registerService } from './register.service';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, name, registrationNumber, branch, mobile } = req.body;
        const { event } = req.body;
        await registerService(email, name, registrationNumber, branch, mobile, event);
        res.status(200).json({
            success: true,
            message: "Successfully registered",
        });
    } catch (error) {
        next(error);
    }
}

export const onspotRegister = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, name, registrationNumber, branch, mobile } = req.body;
        const { event } = req.body;
        await onspotRegisterService(email, name, registrationNumber, branch, mobile, event);
        res.status(200).json({
            success: true,
            message: "Successfully registered"
        });
    } catch (error) {
        next(error);
    }
};
