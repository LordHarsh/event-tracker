import express from "./express";
import mongo from "./mongo";
import Express from "express";
import LoggerInstance from "./logger";
import { getKeys } from "./gKeys";
import { getEventInfo } from "./eventInfo";

export default async ({ expressApp}: { expressApp: Express.Application }): Promise<void> => {
    await mongo();
    LoggerInstance.info("MongoDB Intialized");
    await express({ app: expressApp });
    LoggerInstance.info("Express App Intialized");
    await getKeys();
    LoggerInstance.info("Google Keys Loaded");
    const [numEvents, events] = await getEventInfo();
    LoggerInstance.info(`Loaded ${numEvents} events` + "🚀 ~ " + events + " ~ 🚀 ")
    LoggerInstance.info("All modules loaded!");
};