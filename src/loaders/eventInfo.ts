import { sys } from "typescript";
import { setEventConfig } from "../shared/utils/eventSet"
import LoggerInstance from "./logger";

export const getEventInfo = async () => {
    try {
        const events = await setEventConfig();
        return [events.length, events];
    } catch (error) {
        LoggerInstance.error(error);
        sys.exit(1);
    }
}