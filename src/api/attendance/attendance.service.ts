import { ObjectId } from 'mongodb';
import database from '../../loaders/mongo';
import { updateSheet } from '../../shared/utils/gsheets';
import LoggerInstance from '../../loaders/logger';

export const attendStartService = async (id: string, email: string, event, user): Promise<void> => {
    const collection = (await database()).collection(event.name+"-registrations");
    const timeDifference = ((new Date(event.time)).getTime() - (((new Date()).getTime()) + (1000 * 60 * 60 * 5.5))) / (1000 * 60 * 60);
    if(timeDifference >=  3){
        throw new Error(`Attendance not started for ${event.name}`);
    }
    const exists = await collection.findOne({ _id: new ObjectId(id), email: email });
    if (!exists) {
        throw new Error('Not in database');
    }
    if (exists.presentStart) {
        throw new Error('Already marked present');
    }
    await collection.updateOne({ _id: new ObjectId(id), email: email },  { $set: { presentStart: true, presentStartScannedAt: new Date(), presentStartScannedBy: user.name } });
    const data = await collection.findOne({ _id: new ObjectId(id), email: email });
    await updateSheet(event, data);
    LoggerInstance.info(`Attendance marked for ${data.name} (${data.email}) for ${event.name} by ${user.name} at ${new Date().toLocaleString('en-IN', { timeZone: 'IST' })}')}`)
    return
};

export const getCountService = async (event): Promise<number> => {
    const collection = (await database()).collection(event.name+"-registrations");
    const count = (await collection.find({ presentStart: true }).toArray()).length;
    return count;
};