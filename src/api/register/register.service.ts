import { ObjectId } from 'mongodb';
import database from '../../loaders/mongo';
import config from "../../config";
import { updateSheet } from '../../shared/utils/gsheets';

export const registerService = async (email: string, name: String, registrationNumber: String, branch: String, mobile: String): Promise<void> => {
    const collection = (await database()).collection(config.collectionName);
    const exists = await collection.findOne({ email: email });
    if (exists) {
        await collection.updateOne({ email: email }, { $set: { name, registrationNumber, branch, mobile } });
        return;
    }
    await collection.insertOne({ email, name, registrationNumber, branch, mobile });
    return;
}

export const onspotRegisterService = async (email: string, name: String, registrationNumber: String, branch: String, mobile: String): Promise<void> => {
    const collection = (await database()).collection(config.collectionName);
    const exists = await collection.findOne({ email: email });
    if (exists) {
        throw new Error('Already registered');
    }
    await collection.insertOne({ email, name, registrationNumber, branch, mobile, presentStart: true });
    // console.log(data);
    const data = await collection.findOne({ email });
    await updateSheet(data);
    return;
}