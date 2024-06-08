import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  is_active: {type: Boolean, default: true},
}, {
  timestamps: true
});

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  is_active: string;
}

