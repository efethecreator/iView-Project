import mongoose, { Schema, Document, Types } from 'mongoose';


export interface Question {
    _id: Types.ObjectId; 
    question: string;
    time: number;
}

export interface QuestionPackage extends Document {
    title: string;
    questionCount: number;
    questions: Question[];
}


const QuestionSchema: Schema = new Schema<Question>({
    _id: {
        type: Schema.Types.ObjectId, 
        required: true,
        default: () => new Types.ObjectId(),
    },
    question: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
});


const QuestionPackageSchema: Schema = new Schema<QuestionPackage>({
    title: {
        type: String,
        required: true,
    },
    questionCount: {
        type: Number,
        required: true,
        default: 0, 
    },
    questions: {
        type: [QuestionSchema],
        required: true,
        default: [],
    },
});

// Mongoose model for question packages
export const QuestionPackageModel = mongoose.model<QuestionPackage>('QuestionPackage', QuestionPackageSchema);
