import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "../../../migrations/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";

dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  console.log("no db url");
}

const client = postgres(process.env.DATABASE_URL as any);
const db = drizzle(client, { schema });
const migrateDb = async () => {
  console.log("migrating");
  try {
    console.log("migrating client");
    await migrate(db, { migrationsFolder: "migrations" });
    console.log("successfully migrated");
  } catch (error) {
    console.log("🔴an error in migration");
    console.log(error)
  }
};

migrateDb();

export default db;
