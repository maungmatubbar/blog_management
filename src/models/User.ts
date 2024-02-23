// models/User.ts
import mongoose, { Document, Schema } from 'mongoose';
export interface IUser extends Document {
  //_id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: number;
}
const userSchema:Schema = new mongoose.Schema({
  name: {
     type: String,
     required: true },
  email: { 
    type: String,
     required: true, 
     unique: true },
  password: { 
    type: String,
     required: true},
  phone: {
    type: String,
    require: true,
    },
    address: {
        type: String,
        require: true,
    },
    role: {
        type: Number,
        default: 0,
    },
},{ timestamps: true });

const User = mongoose.model<IUser>('User', userSchema);
export default User;