import database from '../../loaders/mongo'
import config from '../../config'
import { ObjectId } from 'mongodb';
import LoggerInstance from '../../loaders/logger';
import { setEventConfig } from '../../shared/utils/eventGroup';
export const createEventService = async (user,  event): Promise<unknown> => {
    const collection = (await database()).collection(config.collectionName);
    event.time = new Date(event.time);
    if (event.time.getTime() < Date.now() + 6 * 60 * 60 * 1000) {
        throw new Error("Event time must be atleast 6 hours from now");
    }

    collection.updateOne({_id: new ObjectId(config.eventSet._id)}, {$push: {events: {
        name: event.name,
        time: event.time,
        venue: event.venue,
        themeColor: event.themeColor,
        registrationClosed: false,
        sendingRSVPMails: false,
        sendingQRMails: false,
        onspotLimit: 0,
    }}});
    LoggerInstance.info(`Event ${event.name} for ${event.time.toLocaleString("en-IN", {timeZone: "IST",})} created by ${user.name} (${user.email}) at ${new Date().toLocaleString("en-IN", {timeZone: "IST",})}`);
    setEventConfig();
    return config.eventSet.events;
};