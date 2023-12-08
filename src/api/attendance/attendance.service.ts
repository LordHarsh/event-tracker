import { ObjectId } from 'mongodb';
import database from '../../loaders/mongo';
import config from "../../config";
import { updateSheet } from '../../shared/utils/gsheets';

export const attendStartService = async (id: string, email: string, event: any): Promise<void> => {
    const collection = (await database()).collection(event.name+"-registrations");
    const exists = await collection.findOne({ _id: new ObjectId(id), email: email });
    if (!exists) {
        throw new Error('Not in database');
    }
    if (exists.presentStart) {
        throw new Error('Already marked present');
    }
    await collection.updateOne({ _id: new ObjectId(id), email: email },  { $set: { presentStart: true } });
    const data = await collection.findOne({ _id: new ObjectId(id), email: email });
    await updateSheet(event, data);
    return
};

export const getCountService = async (event: any): Promise<number> => {
    const collection = (await database()).collection(event.name+"-registrations");
    const count = (await collection.find({ presentStart: true }).toArray()).length;
    return count;
};