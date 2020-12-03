import { Document, model, Mongoose, Schema } from 'mongoose';


export interface Orders extends Document {
  menuItem: String;
  customer: String;
  chef: String;
  deliveryPerson: String;
  status: String;
  created_at: Date;
  updated_at: Date;
}

const orderSchema = new Schema({
  menuItem: {
    type: Schema.Types.ObjectId,
    required: 'Please choose a dish',
  },
  customer: {
    type: Schema.Types.ObjectId,
    required: 'Please log in',
  },
  chef: Schema.Types.ObjectId,
  deliveryPerson: Schema.Types.ObjectId,
  status: {
    type: String,
    default: "Pending",
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default model<Orders>('Orders', orderSchema);