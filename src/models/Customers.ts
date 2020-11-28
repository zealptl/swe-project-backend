import { Document, model, Schema } from 'mongoose';

export interface Customers extends Document {
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  isApproved: boolean;
  isVIP: boolean;
  isBlacklisted: boolean;
  score: number;
  amountSpent: number;
  balance: number;
  ordersMade: Array<String>; // array of dishes
  reviews: Array<String>; // array of reviews
  warnings: number;
  created_at: Date;
  updated_at: Date;
}

const customersSchema: Schema = new Schema({
  password: {
    type: String,
    required: 'Please enter password',
  },
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
  address: {
    type: String,
    required: 'Please enter your address',
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isVIP: {
    type: Boolean,
    default: false,
  },
  isBlacklisted: {
    type: Boolean,
    default: false,
  },
  score: {
    type: Number,
    default: 0,
  },
  amountSpent: {
    type: Number,
    default: 0,
  },
  balance: {
    type: Number,
    default: 0,
  },
  ordersMade: {
    type: [Schema.Types.ObjectId],
  },
  reviews: {
    type: [Schema.Types.ObjectId],
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

export default model<Customers>('Customers', customersSchema);
//module.exports = mongoose.model('Customers', customersSchema);
