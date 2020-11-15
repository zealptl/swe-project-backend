import { Document, model, Mongoose, Schema } from 'mongoose';


export interface Discussions extends Document {
  message: String;
  messageFrom: String;
  created_at: Date;
  updated_at: Date;
}

const discussionSchema = new Schema({
  message: String,
  messageFrom: Schema.Types.ObjectId,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default model<Discussions>('Reviews', discussionSchema);