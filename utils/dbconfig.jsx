import { neon } from "@neondatabase/serverless"; // Ensure you have the correct Neon package installed
import { drizzle } from "drizzle-orm/neon-http"; // Ensure this is the correct Drizzle ORM package for Neon
import * as schema from "./schema"; // Import your schema from the appropriate file

// Load environment variables if not already done in drizzle.config.js
import dotenv from "dotenv";
dotenv.config();

// Ensure that the DATABASE_URL is defined
// const connectionString = process.env.DATABASE_URL;

// if (!connectionString) {
//   throw new Error("DATABASE_URL environment variable is not defined.");
// }

const sql = neon(
  "postgresql://EXPENSE_TRACKER_owner:VQXig4laO1ne@ep-dry-block-a5s3tfwi.us-east-2.aws.neon.tech/EXPENSE_TRACKER?sslmode=require"
); // Initialize Neon client with the connection string
const db = drizzle({ client: sql }, { schema }); // Set up Drizzle ORM with Neon and schema

// Export the db object for use in your application
export { db };
