import { Request, Response, NextFunction } from 'express';
import { attendStartService, getCountService } from './attendance.service';

export const attendStart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await attendStartService(req.body.id, req.body.email);
        res.status(200).json({
            success: true,
            message: 'Marked Present',
        });

    } catch (error) {
        next(error);
    }
}

export const getCount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const count = await getCountService();
        res.status(200).json({
            success: true,
            data: count,
        });
    } catch (error) {
        next(error)
    }
};