import { Request, Response, NextFunction } from "express";
import config from "../../config";

export async function checkEvent(req: Request, res: Response, next: NextFunction) {
    try {
        const eventSet = config.eventSet;
        const event = eventSet.events.find((event) => event.name === req.params.eventName);
        if (!event){
            throw new Error("Event does not exist or has ended");
        }
        res.locals.event = event;
        next();
    } catch (error) {
        next(error);
    }
}