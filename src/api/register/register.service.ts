import database from '../../loaders/mongo';
import { updateSheet } from '../../shared/utils/gsheets';
// import { sendThankyouMail } from '../../shared/utils/sendMail';

export const registerService = async (email: string, name: string, registrationNumber: string, branch: string, mobile: string, event): Promise<void> => {
    const collection = (await database()).collection(event.name+"-registrations");
    if(event.registrationCloseHours){
        const timeDifference = ((new Date(event.time)).getTime() - (((new Date()).getTime()) + (1000 * 60 * 60 * 5.5))) / (1000 * 60 * 60);
        if(timeDifference <= event.registrationCloseHours){
            throw new Error(`Registration closed for ${event.name}`);
        } 
    }
    const exists = await collection.findOne({ email: email });
    if (exists) {  
        await collection.updateOne({ email: email }, { $set: { name, registrationNumber, branch, mobile } });
        return;
    }
    await collection.insertOne({ email, name, registrationNumber, branch, mobile });
    const user = await collection.findOne({ email });
    // await sendThankyouMail(event, user)
    return;
}

export const onspotRegisterService = async (email: string, name: string, registrationNumber: string, branch: string, mobile: string, event): Promise<void> => {
    const collection = (await database()).collection(event.name+"-registrations");
    const timeDifference = ((new Date(event.time)).getTime() - (((new Date()).getTime()) + (1000 * 60 * 60 * 5.5))) / (1000 * 60 * 60);
    if(timeDifference >=  3){
        throw new Error(`Onspot not started for ${event.name}`);
    } 
    const exists = await collection.findOne({ email: email });
    if (exists) {
        throw new Error('Already registered');
    }
    await collection.insertOne({ email, name, registrationNumber, branch, mobile, presentStart: true });
    const data = await collection.findOne({ email });
    await updateSheet(event, data);
    return;
}