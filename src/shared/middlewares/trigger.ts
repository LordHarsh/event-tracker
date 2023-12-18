import { TriggerClient } from "@trigger.dev/sdk";
import config from "../../config";

export const client = new TriggerClient({
  id: "event-tracker-uYlJ",
  apiKey: config.trigger.apiKey,
});
