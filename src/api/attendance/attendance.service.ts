import { ObjectId } from 'mongodb';
import database from '../../loaders/mongo';
import config from "../../config";

export const attendStartService = async (id: string, email: string): Promise<void> => {
    const collection = (await database()).collection(config.collectionName);
    const exists = await collection.findOne({ _id: new ObjectId(id), email: email });
    if (!exists) {
        throw new Error('Not in database');
    }
    const count = await collection.updateOne({ _id: new ObjectId(id), email: email },  { $set: { presentStart: true } });
    return
};

export const getCountService = async (): Promise<number> => {
    const collection = (await database()).collection(config.collectionName);
    const count = (await collection.find({ presentStart: true }).toArray()).length;
    return count;
};