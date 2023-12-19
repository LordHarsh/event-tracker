import LoggerInstance from '../../loaders/logger';
import database from '../../loaders/mongo';
import { sendQRMail, sendThankyouMail } from '../../shared/utils/sendMail';

export const registerService = async (email: string, name: string, registrationNumber: string, branch: string, mobile: string, event): Promise<void> => {
    const collection = (await database()).collection(event.name+"-registrations");
    const timeDifference = ((new Date(event.time)).getTime() - ((new Date()).getTime())) / (1000 * 60 * 60);
    if(event.registrationClosed || timeDifference <= 3){
        if (event.onspotLimit > 0) {
            const onspotCount = await collection.countDocuments({ onspot: true });
            if (onspotCount >= event.onspotLimit) {
                throw new Error(`Registration closed for ${event.name}`);
            }
            const exists = await collection.findOne({ email: email });
            if (exists) {  
                throw new Error('Already registered');
            }
            await collection.insertOne({ email, name, registrationNumber, branch, mobile, rsvpStatus: false, registerAt: new Date(), onspot: true, rsvpAt: null, presentStart: false, presentStartScannedAt: null, presentStartScannedBy: null });
            const user = await collection.findOne({ email });
            await sendQRMail(event, user);
            LoggerInstance.info(`Onspot Registered ${name} (${email}) for ${event.name} at ${new Date().toLocaleString('en-IN', { timeZone: 'IST' })}')}`)
            return;
        }
        throw new Error(`Registration closed for ${event.name}`);
    }
    const exists = await collection.findOne({ email: email });
    if (exists) {  
        await collection.updateOne({ email: email }, { $set: { name, registrationNumber, branch, mobile } });
        return;
    }
    await collection.insertOne({ email, name, registrationNumber, branch, mobile, rsvpStatus: false, registerAt: new Date(), onspot: false, rsvpAt: null, presentStart: false, presentStartScannedAt: null, presentStartScannedBy: null });
    const user = await collection.findOne({ email });
    await sendThankyouMail(event, user)
    LoggerInstance.info(`Registered ${name} (${email}) for ${event.name} at ${new Date().toLocaleString('en-IN', { timeZone: 'IST' })}')}`)
    return;
}
