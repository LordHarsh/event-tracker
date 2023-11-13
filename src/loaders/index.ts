import express from "./express";
import mongo from "./mongo";
import Express from "express";
import LoggerInstance from "./logger";
import { getKeys } from "./gKeys";

export default async ({ expressApp}: { expressApp: Express.Application }): Promise<void> => {
    await mongo();
    LoggerInstance.info("MongoDB Intialized");
    await express({ app: expressApp });
    LoggerInstance.info("Express App Intialized");
    await getKeys();
    LoggerInstance.info("Google Keys Loaded");
    LoggerInstance.info("All modules loaded!");
};