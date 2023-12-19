import database from "../../loaders/mongo";
import config from "../../config";
import z from "zod";
import LoggerInstance from "../../loaders/logger";

const eventSetSchema = z.object({
  name: z.string(),
  gsheetId: z.string(),
  events: z.array(
    z.object({
      name: z.string(),
      time: z.date(),
      venue: z.string(),
      themeColor: z.string(),
    })
  ),
});

export const setEventConfig = async () => {
  const collection = (await database()).collection(config.collectionName);
  const headDocument = await collection.findOne({
    CURRENTEVENTSET: "CURRENTEVENTSET",
  });
  if (!headDocument) {
    throw new Error("Document not found with name `CURRENTEVENTSET`");
  }
  const eventName = headDocument.eventName;
  if (!eventName) {
    throw new Error(
      "Cannot find event name in `CURRENTEVENTSET` [use key `eventName`]"
    );
  }
  const eventInfo = await collection.findOne({ name: eventName });
  if (!eventInfo) {
    throw new Error(`Event with name ${eventName} not found`);
  }
  for (const event of eventInfo.events) {
    LoggerInstance.info(
      `Setting up ${event.name} at ${event.time.toLocaleString("en-IN", {
        timeZone: "IST",
      })}...`
    );
    if (event.rsvp && !(event.rsvpMailHoursBefore >= 3)) {
      throw new Error(
        `RSVP is enabled for ${event.name} but rsvpMailHoursBefore is not set (should be >=3)`
      );
    } else {
      event.rsvp = false;
      event.rsvpMailHoursBefore = 0;
    }
    if (!event.registrationCloseHours) {
      event.registrationCloseHours = 0;
    }
  }
  eventSetSchema.parseAsync(eventInfo);
  await collection.updateOne(
    { name: eventName },
    { $set: { events: eventInfo.events, refreshedAt: new Date() } }
  );

  config.eventSet = eventInfo;
  return eventInfo.events.map((event) => event.name);
};
