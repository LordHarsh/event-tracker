import { Request, Response, NextFunction } from 'express';
import { registerService } from './register.service';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, name, registrationNumber, branch, mobile } = req.body;
        await registerService(email, name, registrationNumber, branch, mobile);
        res.status(200).json({ 
            success: true,
            message: "Successfully registered"
        });
    } catch (error) {
        next(error);
    }
}