import { Request, Response, NextFunction } from 'express';
import { attendStartService, getCountService } from './attendance.service';

export const attendStart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const event = req.body.event;
        await attendStartService(req.body.id, req.body.email, event);
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
        const event = req.body.event;
        const count = await getCountService(event);
        res.status(200).json({
            success: true,
            data: count,
        });
    } catch (error) {
        next(error)
    }
};