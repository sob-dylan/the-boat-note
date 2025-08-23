/**
 * This table definition `usersInAuth` is a minimal reference to the Supabase auth.users table
 * in the "auth" schema. It exists because Drizzle ORM requires explicit table definitions 
 * to represent relations across different schemas (public vs auth).
 * 
 * Supabase manages user authentication data in the internal auth.users table, which is outside
 * the public schema and not directly accessible via typical ORM imports. To create foreign key 
 * relationships or joins involving auth.users, we define this minimal schema.
 * 
 * This allows us to:
 * - Reference auth.users in relationships and joins type-safely
 * - Maintain separation of the auth schema from the public schema
 * - Avoid duplication or modification of Supabase's managed auth.users table
 * 
 * Use this only when referencing auth.users directly; otherwise, use your app's public `users` table.
 */

import { pgSchema, uuid } from "drizzle-orm/pg-core";

const authSchema = pgSchema("auth");

export const usersInAuth = authSchema.table("users", {
  id: uuid("id").primaryKey(),
});
