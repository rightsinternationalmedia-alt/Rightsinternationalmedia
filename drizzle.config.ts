import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Dashboard-provided variables take priority over local files.
config({ path: ".env.local", quiet: true });
config({ path: ".env", quiet: true });

const databaseUrl = process.env.DATABASE_URL_UNPOOLED?.trim() || process.env.DATABASE_URL?.trim();
if (!databaseUrl) {
  throw new Error("Set DATABASE_URL (and optionally DATABASE_URL_UNPOOLED) before running database migrations.");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: { url: databaseUrl },
});
