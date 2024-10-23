import mongoose, { Schema, Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface Question {
  question: string;
  time: number;
}

// Interface for Interview schema
export interface IInterview extends Document {
  title: string;
  packages: Types.ObjectId[]; // Referencing QuestionPackage
  questions: Question[]; // Assuming questions are strings
  expireDate: Date;
  canSkip: boolean;
  showAtOnce: boolean;
  interviewLink?: string; // Optional field
  users: Types.ObjectId[]; // Referencing Users
}

// Mongoose schema for Interview
const InterviewSchema: Schema = new Schema<IInterview>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  packages: [{
    type: Schema.Types.ObjectId,
    ref: 'QuestionPackage', // Reference to QuestionPackage
    required: true
  }],
  questions: {
    type: [
      {
        question: {
          type: String,
          required: true
        },
        time: {
          type: Number,
          required: true
        }
    }],
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
    default: () => uuidv4(), // Automatically generates a UUID for the interview link
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true,
    default: [] // Initially empty array for users
  }]
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Mongoose model for Interview
const Interview = mongoose.model<IInterview>('Interview', InterviewSchema);

export default Interview;
