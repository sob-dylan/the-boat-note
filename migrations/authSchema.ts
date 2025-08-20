import { pgSchema, uuid } from "drizzle-orm/pg-core";

const authSchema = pgSchema("auth");

export const usersInAuth = authSchema.table("users", {
  id: uuid("id").primaryKey(),
});
