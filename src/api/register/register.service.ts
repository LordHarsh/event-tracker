import { ObjectId } from 'mongodb';
import database from '../../loaders/mongo';
import config from "../../config";

export const registerService = async (email: string, name: String, registerationNumber: String): Promise<void> => {
    const collection = (await database()).collection(config.collectionName);
    const exists = await collection.findOne({ email: email });
    if (exists) {
        await collection.updateOne({ email: email }, { $set: { name, registerationNumber } });
        return;
    }
    await collection.insertOne({ email, name, registerationNumber });
    return;
}