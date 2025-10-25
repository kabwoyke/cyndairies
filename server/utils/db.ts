import 'dotenv/config';
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "~~/server/db/schema";

// Create (or open) the SQLite database file
const sqlite = new Database("database.sqlite");

// Connect Drizzle to it
export const db = drizzle(sqlite, { schema });
