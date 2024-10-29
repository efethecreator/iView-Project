import mongoose, { Schema, Document, Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface Question {
  question: string;
  time: number;
}

// Interface for Interview schema
export interface IInterview extends Document {
  title: string;
  packages: Types.ObjectId[]; // Referencing QuestionPackage
  questions: Question[];
  expireDate: Date;
  canSkip: boolean;
  showAtOnce: boolean;
  interviewLink?: string;
  users: Types.ObjectId[];
}

const InterviewSchema: Schema = new Schema<IInterview>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    packages: [
      {
        type: Schema.Types.ObjectId,
        ref: "QuestionPackage", // Referans olarak QuestionPackage modelini kullanıyoruz
        required: true,
      },
    ],
    questions: {
      type: [
        {
          question: {
            type: String,
            required: true,
          },
          time: {
            type: Number,
            required: true,
          },
        },
      ],
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
    interviewLink: {
      type: String,
      default: () => uuidv4(),
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
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
