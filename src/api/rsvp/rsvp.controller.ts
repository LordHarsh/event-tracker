import { Request, Response, NextFunction } from 'express';
import { rsvpService } from './rsvp.service';

export const rsvpController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const event = res.locals.event;
        await rsvpService(req.params.id, event);
        res.status(200).json({ 
            success: true,
            message: 'RSVP successful' 
        });
    } catch (e) {
        next(e);
    }
};