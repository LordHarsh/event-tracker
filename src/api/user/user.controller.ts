import { Request, Response, NextFunction } from 'express';
import { getAllUsersService, getUnverifiedUsersService, verifyUserService } from './user.services';


export const getUnverifiedUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getUnverifiedUsersService();  
        res.status(200).json({ 
            success: true,
            message: 'Unverified users fetched successfully',
            data: users,
        });
    } catch (error) {
        next(error);
    }
};
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getAllUsersService();  
        res.status(200).json({ 
            success: true,
            message: 'All users fetched successfully',
            data: users,
        });
    } catch (error) {
        next(error);
    }
};

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id: _id } = req.params;
        await verifyUserService(res.locals.user.name, _id);
        res.status(200).json({ 
            success: true,
            message: 'User verified successfully',
        });
    } catch (error) {
        next(error);
    }
};