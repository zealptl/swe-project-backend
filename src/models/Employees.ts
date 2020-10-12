import { Document, model, Mongoose, Schema } from 'mongoose';
import { Reviews } from './Reviews';
import { MenuItems } from './MenuItems';


export interface Employees extends Document {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  salary: number;
  type: String;
  orders: Array<MenuItems>;
  reviews: Array<Reviews>
  averageRating: number;
  isApproved: boolean;
  demotedTimes: number;
  created_at: Date;
  updated_at: Date;
}

const employeesSchema = new Schema({
    firstName: {
        type: String,
        required: 'Please enter your first name'
    },
    lastName: {
        type: String,
        required: 'Please enter your last name'
    },
    email: {
        type: String,
        unique: true,
        required: 'Please enter your email'
    },
    password: {
        type: String,
        required: 'Please enter password'
    },
    salary: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
    },
    orders: {
        type: Array,
    },
    reviews: {
        type: Array,
    },
    averageRating: {
        type: Number,
        default: 5.0
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    demotedTimes: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
});

export default model<Employees>('Employees', employeesSchema);