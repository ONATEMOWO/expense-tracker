import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  dialect: 'postgresql',
  schema: './utils/schema.jsx', // Adjust the path as per your structure
  out: './drizzle',
  // driver: 'pglite',
  dbCredentials: {
    url: "postgresql://EXPENSE_TRACKER_owner:VQXig4laO1ne@ep-dry-block-a5s3tfwi.us-east-2.aws.neon.tech/EXPENSE_TRACKER?sslmode=require", // This should now correctly use the value from .env
  },
  // dbCredentials: {
  //   host: "ep-dry-block-a5s3tfwi.us-east-2.aws.neon.tech",
  //   port: 5432,
  //   user: "EXPENSE_TRACKER_owner",
  //   password: "VQXig4laO1ne",
  //   database: "EXPENSE_TRACKER",
  //   ssl: true, // can be boolean | "require" | "allow" | "prefer" | "verify-full" | options from node:tls
  // }
});
