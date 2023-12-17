import { ObjectId } from 'mongodb';
import database from '../../loaders/mongo';

export const rsvpService = async (id: string, event): Promise<void> => {
    const collection = (await database()).collection(event.name+"-registrations");
    const exists = await collection.findOne({ _id: new ObjectId(id) });
    if (!exists) {
        throw new Error('Not registered');
    }
    await collection.updateOne(exists, { $set: { rsvpStatus: true, rsvpAt: new Date() } });
    return;
};