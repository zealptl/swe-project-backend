import { Document, model, Mongoose, Schema } from 'mongoose';

export interface Reviews extends Document {
  review: String;
  reviewFrom: String;
  reviewFromType: String;
  reviewTo: String;
  reviewToType: String;
  starRating: number;
  type: String;
  isApproved: boolean;
  needToBeHandled: boolean;
  created_at: Date;
  updated_at: Date;
}

const reviewSchema = new Schema({
  review: String,
  reviewFrom: Schema.Types.ObjectId,
  reviewFromType: String,
  reviewTo: Schema.Types.ObjectId,
  reviewToType: String,
  starRating: Number,
  type: String,
  isApproved: { type: Boolean, default: false },
  needToBeHandled: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default model<Reviews>('Reviews', reviewSchema);
