import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || "mongodb+srv://pratik:NNUaVMk2aoh643jd@cluster0.rclew.mongodb.net/project-mng",
  nodeEnv: process.env.NODE_ENV || 'development',
};