import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";

async function start() {
  // 1. Connect to Database first
  await connectDB();

  // 2. Start Express
  app.listen(env.port, () => {
    console.log(`-----------------------------------------`);
    console.log(`🚀 Server running in ${env.nodeEnv} mode`);
    console.log(`📡 Listening on http://localhost:${env.port}`);
    console.log(`-----------------------------------------`);
  });
}

start().catch((err) => {
  console.error("FATAL: Failed to start server", err);
  process.exit(1);
});