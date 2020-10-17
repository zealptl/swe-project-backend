import { Document, model, Mongoose, Schema } from 'mongoose';


export interface Reviews extends Document {
  review: String;
  reviewFrom: String;
  reviewTo: String;
  starRating: String;
  type: String;
  created_at: Date;
  updated_at: Date;
}

const reviewSchema = new Schema({
  review: String,
  reviewFrom: Schema.Types.ObjectId,
  reviewTo: Schema.Types.ObjectId,
  starRating: Number,
  type: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default model<Reviews>('Reviews', reviewSchema);