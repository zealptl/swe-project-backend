import { Document, model, Mongoose, Schema } from 'mongoose';
import { Customers } from './Customers';
import { Employees } from './Employees';



export interface Managers extends Document {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  customerToApprove: Array<Customers>;
  chefToApprove: Array<Employees>;
  deliveryPersonToApprove: Array<Employees>;
  created_at: Date;
  updated_at: Date;
}

const managersSchema = new Schema({
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
    customerToApprove: {
        type: Array
    },
    chefToApprove: {
        type: Array
    },
    deliveryPersonToApprove: {
        type: Array
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

export default model<Managers>('Managers', managersSchema);