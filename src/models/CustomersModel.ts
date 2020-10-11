import { Schema } from "mongoose";
import { Document } from 'mongoose';

import importedMongoose = require('mongoose');

const mongoose = importedMongoose;

export interface Customers extends Document {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  isApproved: boolean;
  isVIP: boolean;
  amountSpent: number;
  balance: number;
  ordersMade: Array<number>; // change to array of dishes
  reviews: Array<number>; // change to array of reviews
  warnings: number;
  created_at: Date;
  updated_at: Date;
}

const CustomersSchema : Schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: 'Please enter username'
  },
  password: {
    type: String,
    required: 'Please enter password'
  },
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
    required: 'Please enter your email'
  },
  address: {
    type: String,
    required: 'Please enter your address'
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  isVIP: {
    type: Boolean,
    default: false
  },
  amountSpent: {
    type: Number,
    default: 0
  },
  balance: {
    type: Number,
    default: 0
  },
  ordersMade: {
    type: Array
  },
  reviews: {
    type: Array 
  },
  warnings: {
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


//export default mongoose.model<Customers>('CustomersModel', CustomersSchema);
module.exports = mongoose.model('CustomersModel', CustomersSchema);