import mongoose, { Schema, Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Interface for Interview schema
export interface IInterview extends Document {
  title: string;
  packages: Types.ObjectId[]; // Referencing QuestionPackage
  questions: string[]; // Assuming questions are strings
  expireDate: Date;
  canSkip: boolean;
  showAtOnce: boolean;
  interviewLink?: string; // Optional field
  users: Types.ObjectId[]; // Referencing Users
}

// Mongoose schema for Interview
const InterviewSchema: Schema<IInterview> = new Schema<IInterview>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  packages: [{
    type: Schema.Types.ObjectId,
    ref: 'QuestionPackage', 
    required: true
  }],
  questions: {
    type: [String],
    required: true,
    default: []
  },
  expireDate: {
    type: Date,
    required: true
  },
  canSkip: {
    type: Boolean,
    required: true,
    default: false
  },
  showAtOnce: {
    type: Boolean,
    required: true,
    default: false
  },
  interviewLink: {
    type: String,
    default: uuidv4 // Generates UUIDv4 for each interview
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
    default: [] 
  }]
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Mongoose model for Interview
const Interview = mongoose.model<IInterview>('Interview', InterviewSchema);

export default Interview;
