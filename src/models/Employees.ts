import { Document, model, Schema } from 'mongoose';

export interface Employees extends Document {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  salary: number;
  type: String;
  status: String;
  orders: Array<String>;
  reviews: Array<String>;
  averageRating: number;
  score: number;
  isApproved: boolean;
  demotedTimes: number;
  warnings: number;
  created_at: Date;
  updated_at: Date;
}

const employeesSchema = new Schema({
  firstName: {
    type: String,
    required: 'Please enter your first name',
  },
  lastName: {
    type: String,
    required: 'Please enter your last name',
  },
  email: {
    type: String,
    unique: true,
    required: 'Please enter your email',
  },
  password: {
    type: String,
    required: 'Please enter password',
  },
  salary: {
    type: Number,
    default: 60000,
  },
  type: {
    type: String,
  },
  status: {
    type: String,
  },
  orders: {
    type: [Schema.Types.ObjectId],
  },
  reviews: {
    type: [Schema.Types.ObjectId],
  },
  averageRating: {
    type: Number,
    default: 5.0,
  },
  score: {
    type: Number,
    default: 6.0,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  demotedTimes: {
    type: Number,
    default: 0,
  },
  warnings: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

export default model<Employees>('Employees', employeesSchema);
