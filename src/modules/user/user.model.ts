import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  is_active: {type: Boolean, default: true},
}, {
  timestamps: true
});

UserSchema.pre('save', async function (next) {
  try{
    const user = this as mongoose.Document & { password: string };

    if(!user.isModified('password')) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  }catch(err) {
    next(err);
  }
});


export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  is_active: string;
}

