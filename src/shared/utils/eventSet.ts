import database from "../../loaders/mongo";
import config from "../../config";
import z from "zod";

const eventSetSchema = z.object({
  name: z.string(),
  gsheetId: z.string(),
  events: z.array(
    z.object({
      name: z.string(),
      time: z.string().refine(
        (dateString) => {
          const parsedDate = new Date(dateString);
          return !isNaN(parsedDate.getTime());
        },
        { message: "Invalid date format" }
      ),
      sheetNo: z.number().min(0),
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
  eventSetSchema.parseAsync(eventInfo);
  config.eventSet = eventInfo;
  return eventInfo.events.map((event) => event.name);
};
