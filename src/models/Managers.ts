import { Document, model, Schema } from 'mongoose';

export interface Managers extends Document {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  customerToApprove: Array<String>;
  chefToApprove: Array<String>;
  deliveryPersonToApprove: Array<String>;
  created_at: Date;
  updated_at: Date;
}

const managersSchema = new Schema({
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
  customerToApprove: {
    type: [Schema.Types.ObjectId],
  },
  chefToApprove: {
    type: [Schema.Types.ObjectId],
  },
  deliveryPersonToApprove: {
    type: [Schema.Types.ObjectId],
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

export default model<Managers>('Managers', managersSchema);
