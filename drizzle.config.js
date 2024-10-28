import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://ai-interview-mocker_owner:uRTMz7EI3cvg@ep-red-sound-a8vzomie.eastus2.azure.neon.tech/ai-interview-mocker?sslmode=require",
  },
});
