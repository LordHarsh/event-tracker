import { LoginUser, SignupUser } from "./auth.schema";
import database from "../../loaders/mongo";
import bcrypt from "bcrypt";
import generateToken from "../../shared/jwt";

export const signupService = async (user: SignupUser): Promise<void> => {
  const collection = (await database()).collection("users");
  const exists = await collection.findOne({ email: user.email });
  if (exists) {
    throw new Error("Email already exists");
  }
  const saltRounds = 10;
  const hash = await bcrypt.hash(user.password, saltRounds);
  await collection.insertOne({
    name: user.name,
    email: user.email,
    domain: user.domain,
    position: user.position,
    password: hash,
    phone: user.phone,
    createdAt: new Date(),
    permissions: null,
    verifiedAt: null,
    verifiedBy: null,
    isDeleted: false,
  });
  return;
};

export const loginService = async (user: LoginUser): Promise<unknown> => {
  const collection = (await database()).collection("users");
  const exists = await collection.findOne({ email: user.email });
  if (!exists) {
    throw new Error("Incorrect password / email");
  }
  const match = await bcrypt.compare(user.password, exists.password);
  if (!match) {
    throw new Error("Incorrect password / email");
  }
  return {
    name: exists.name,
    email: exists.email,
    domain: exists.domain,
    position: exists.position,
    phone: exists.phone,
    createdAt: exists.createdAt,
    permissions: exists.permissions,
    token: generateToken(exists.email),
  };
};
