import { setEventConfig } from "../../shared/utils/eventSet";

export const refreshMongo = async (): Promise<void> => {
    await setEventConfig();
};
