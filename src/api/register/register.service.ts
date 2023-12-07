import database from '../../loaders/mongo';
import config from "../../config";
import { updateSheet } from '../../shared/utils/gsheets';

export const registerService = async (email: string, name: String, registrationNumber: String, branch: String, mobile: String, event: any): Promise<void> => {
    const collection = (await database()).collection(event.name+"-registrations");
    const exists = await collection.findOne({ email: email });
    if (exists) {
        await collection.updateOne({ email: email }, { $set: { name, registrationNumber, branch, mobile } });
        return;
    }
    await collection.insertOne({ email, name, registrationNumber, branch, mobile });
    return;
}

export const onspotRegisterService = async (email: string, name: String, registrationNumber: String, branch: String, mobile: String, event: any): Promise<void> => {
    const collection = (await database()).collection(event.name+"-registrations");
    const exists = await collection.findOne({ email: email });
    if (exists) {
        throw new Error('Already registered');
    }
    await collection.insertOne({ email, name, registrationNumber, branch, mobile, presentStart: true });
    const data = await collection.findOne({ email });
    await updateSheet(data);
    return;
}