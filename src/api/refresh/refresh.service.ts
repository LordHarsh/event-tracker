import { setEventConfig } from "../../shared/utils/eventGroup";

export const refreshMongo = async (): Promise<void> => {
    await setEventConfig();
};
