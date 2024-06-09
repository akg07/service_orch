import * as mongoose from 'mongoose';

export const LogSchema = new mongoose.Schema({
  method: String,
  originalUrl: String,
  requestBody: mongoose.Schema.Types.Mixed,
  responseBody: mongoose.Schema.Types.Mixed,
  statusCode: Number,
  duration: Number,
  systemInformation: mongoose.Schema.Types.Mixed,
  createAt: {type: Date, default: Date.now},
});

export interface Log extends mongoose.Document {
  method: string;
  originalUrl: string;
  requestBody: any;
  responseBody: any;
  statusCode: number;
  duration: number;
  systemInformation: any;
  createdAt: Date;
}