import { ObjectId } from 'mongodb';
import database from '../../loaders/mongo';
import { sendQRMail } from '../../shared/utils/sendMail';
import LoggerInstance from '../../loaders/logger';

export const rsvpService = async (id: string, event): Promise<void> => {
    const collection = (await database()).collection(event.name+"-registrations");
    const exists = await collection.findOne({ _id: new ObjectId(id) });
    if (!exists) {
        throw new Error('Not registered');
    }
    await collection.updateOne(exists, { $set: { rsvpStatus: true, rsvpAt: new Date() } });
    await sendQRMail(event, exists);
    LoggerInstance.info(`RSVP done by ${exists.name} (${exists.email}) for ${event.name} at ${new Date().toLocaleString('en-IN', { timeZone: 'IST' })}')}`)
    return;
};