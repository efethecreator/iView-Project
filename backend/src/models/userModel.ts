import { Schema, model, Document } from 'mongoose';

export interface IUserInput {
  name: string;
  surname: string;
  email: string;
  phone: string;
  videoUrl?: string;  
  status?: string;    
  note?: string;      
}



const userSchema = new Schema<IUserInput>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  videoUrl: {
    type: String,
    required: false 
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'accepted', 'rejected'], 
    default: 'pending'
  },
  note: {
    type: String,
    required: false,
    trim: true
  }
}, {
  timestamps: true 
});


const User = model<IUserInput>('User', userSchema);

export default User;
