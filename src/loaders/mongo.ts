import { Db, MongoClient } from "mongodb";
import config from "../config";

let db: Db;

async function initialClient(): Promise<Db> {
  const client = await MongoClient.connect(config.databaseUrl, {
    ignoreUndefined: true,
  });
  return client.db();
}
export default async(): Promise<Db> => {
    if (!db) {
        db = await initialClient();
    }
    return db;
}
