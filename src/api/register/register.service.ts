import database from '../../loaders/mongo';
import { client } from '../../shared/middlewares/trigger';
import { updateSheet } from '../../shared/utils/gsheets';

export const registerService = async (email: string, name: string, registrationNumber: string, branch: string, mobile: string, event): Promise<void> => {
    const collection = (await database()).collection(event.name+"-registrations");
    // registration `registrationCloseHours` hours before the event
    if(event.registrationCloseHours){
        const timeDifference = ((new Date(event.time)).getTime() - ((new Date()).getTime())) / (1000 * 60 * 60);
        if(timeDifference <= event.registrationCloseHours){
            throw new Error(`Registration closed for ${event.name}`);
        } 
    }
    const exists = await collection.findOne({ email: email });
    if (exists) {  
        await collection.updateOne({ email: email }, { $set: { name, registrationNumber, branch, mobile } });
    } else {
        await collection.insertOne({ email, name, registrationNumber, branch, mobile, rsvpStatus: false, registerAt: new Date(), rsvpAt: null, presentStart: false });
    }
    const user = await collection.findOne({ email });
    const res = await client.sendEvent({
        name: "send-single-mail",
        payload: { user, event },
      });
    console.log(res);
    return;
}

export const onspotRegisterService = async (email: string, name: string, registrationNumber: string, branch: string, mobile: string, event): Promise<void> => {
    const collection = (await database()).collection(event.name+"-registrations");
    const timeDifference = ((new Date(event.time)).getTime() - ((new Date()).getTime())) / (1000 * 60 * 60);
    // rsvp starts 3 hours before the event
    if(timeDifference >=  3){ 
        throw new Error(`Onspot not started for ${event.name}`);
    } 
    const exists = await collection.findOne({ email: email });
    if (exists) {
        throw new Error('Already registered');
    }
    await collection.insertOne({ email, name, registrationNumber, branch, mobile, rsvpStatus: false, registerAt: new Date(), rsvpAt: null, presentStart: true });
    const data = await collection.findOne({ email });
    await updateSheet(event, data);
    return;
}