import mongoose, { Schema, Document, Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface Question {
  question: string;
  time: number;
}

export interface IInterview extends Document {
  title: string;
  packages: packages[]; 
  questions: Question[]; 
  expireDate: Date;
  canSkip: boolean;
  totalVideos: number;
  pendingVideos: number;
  showAtOnce: boolean;
  interviewLink?: string; 
  users: Types.ObjectId[]; 
}

interface packages extends Document {
  packageId: string;
}

const packagesSchema = new Schema<packages>({
  packageId: {
    type: String,
    required: true,
  },
});

const InterviewSchema: Schema = new Schema<IInterview>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    packages: { type: [packagesSchema], required: true, default: [] },
    questions: {
      type: [
        {
          question: {
            type: String,
            required: false,
          },
          time: {
            type: Number,
            required: false,
          },
        },
      ],
      required: false,
      default: [],
    },
    expireDate: {
      type: Date,
      required: true,
    },
    canSkip: {
      type: Boolean,
      required: true,
      default: false,
    },
    showAtOnce: {
      type: Boolean,
      required: true,
      default: false,
    },
    totalVideos: {
      type: Number,
      required: false,
      default: 0,
    },
    pendingVideos: {
      type: Number,
      required: false,
      default: 0,
    },
    interviewLink: {
      type: String,
      default: () => uuidv4(), 
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", 
        required: false,
        default: [],
      },
    ],
  },
  {
    timestamps: true, 
  }
);

const Interview = mongoose.model<IInterview>("Interview", InterviewSchema);

export default Interview;
