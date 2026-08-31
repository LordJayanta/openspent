import { db, initDb } from "@/shared/db/database";
import { user, type User } from "@/shared/db/schema";
import { eq } from "drizzle-orm";
import { SQLiteRunResult } from "expo-sqlite";

const creatUser = async ({ name, currency, hasFinishedOnboarding }: User) => {
  try {
    // Check for required fields
    if (!name || !currency) throw new Error("Missing required fields");

    await initDb();

    // Check if user already exists
    const existingUser: User[] = await db.select().from(user);

    if (existingUser.length > 1) {
      throw new Error("A User already exists. Only one user allowed.");
    }

    // create New user
    const result: User[] = await db
      .insert(user)
      .values({
        name,
        currency,
        hasFinishedOnboarding,
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("createUser: ", error);
  }
};
const updateUser = async ({
  id,
  name,
  currency,
  hasFinishedOnboarding,
}: User) => {
  try {
    // Check for required fields
    if (!id || !name || !currency || !hasFinishedOnboarding) {
      throw new Error("Missing required fields");
    }

    await initDb();

    const res: Required<User>[] = await db
      .update(user)
      .set({ name, currency, hasFinishedOnboarding })
      .where(eq(user.id, id))
      .returning();

    return res[0];
  } catch (error) {
    console.error("updateUser: ", error);
  }
};

const getUser = async () => {
  try {
    await initDb();

    // Check if user already exists
    const existingUser: User[] = await db.select().from(user);

    if (existingUser.length === 0) {
      // throw new Error("No User found.");

      // create Defult Guset User
      const guestUser = await creatUser({
        name: "Guest",
        currency: "INR",
        hasFinishedOnboarding: false,
      });

      if (!guestUser) throw new Error("Failed to create guest user.");

      return guestUser;
    }

    return existingUser[existingUser.length - 1]; // return last user created user
  } catch (error) {
    console.error("getUser: ", error);
  }
};

const setUserNameById = async (id: User["id"], name: string) => {
  if (!id || !name) return;

  try {
    await initDb();

    const res: SQLiteRunResult = await db
      .update(user)
      .set({ name })
      .where(eq(user.id, id));

    return res.changes;
  } catch (error) {
    console.error("setNameById: ", error);
  }
};

const setCurrencyById = async (id: User["id"], currency: string) => {
  if (!id || !currency) return;

  try {
    await initDb();

    const res: SQLiteRunResult = await db
      .update(user)
      .set({ currency })
      .where(eq(user.id, id));

    return res.changes;
  } catch (error) {
    console.error("setCurrencyById: ", error);
  }
};

export const useUserDB = {
  creatUser,
  updateUser,
  getUser,
  setUserNameById,
  setCurrencyById,
};
