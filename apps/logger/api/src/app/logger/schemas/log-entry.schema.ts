import * as mongoose from 'mongoose';

export const LogEntrySchema = new mongoose.Schema({
  id: String,
  category: String,
  logLevel: Number,
  message: String
});
