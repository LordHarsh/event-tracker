import { Request, Response, NextFunction } from 'express';
import { createEventService } from './event.service';

export const createEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await createEventService(res.locals.user, req.body);
        res.status(200).json({ 
            success: true,
            message: 'Event created successfully',
            data
        });
    } catch (error) {
        next(error);
    }
};