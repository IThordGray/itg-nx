import { Document } from 'mongoose';

export interface ILogEntry extends Document {
  id: string;
  category?: string;
  logLevel: string;
  message: string;
}
