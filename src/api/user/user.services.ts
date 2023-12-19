import { ObjectId } from "mongodb";
import database from "../../loaders/mongo";
import LoggerInstance from "../../loaders/logger";

export const getUnverifiedUsersService = async (): Promise<unknown> => {
  const collection = (await database()).collection("users");
  const users = await collection
    .find(
      { verified: false },
      {
        projection: {
          _id: 1,
          name: 1,
          email: 1,
          domain: 1,
          position: 1,
          phone: 1,
          permissions: 1,
        },
      }
    )
    .toArray();
  return users;
};

export const getAllUsersService = async (): Promise<unknown> => {
  const collection = (await database()).collection("users");
  return await collection
    .find(
      { verified: true },
      {
        projection: {
          _id: 1,
          name: 1,
          email: 1,
          domain: 1,
          position: 1,
          phone: 1,
          permissions: 1,
          verifiedBy: 1,
        },
      }
    )
    .toArray();
};

export const verifyUserService = async (adminName: string, _id: string): Promise<void> => {
  console.log(adminName, _id);
  const collection = (await database()).collection("users");
  const user = await collection.findOneAndUpdate(
    { _id: new ObjectId(_id), permissions: null },
    { $set: { permissions: "member", verifiedBy: adminName, verifiedAt: new Date() } },
  );
  if (!user) {
    throw new Error("Unverified user not found or already verified");
  }
  LoggerInstance.info(`User ${user.name} (${user.email}) verified by ${adminName} at ${new Date().toLocaleString("en-IN", {timeZone: "IST",})}}`);
  return;
}