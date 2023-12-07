import { Request, Response, NextFunction } from "express";
import database from "../../loaders/mongo";
import config from "../../config";

export async function checkEvent(req: Request, res: Response, next: NextFunction) {
    try {
        const collection = (await database()).collection(config.collectionName);
        const event = await collection.findOne({ "name": config.eventSetName, "events.name": req.params.eventName }, {
            projection: { _id: 0, 'events.$': 1 }
        });
        if (!event) {
            throw new Error('Event not found');
        }
        req.body.event = event.events[0];
        next();
    } catch (error) {
        next(error);
    }
}