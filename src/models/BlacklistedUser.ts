import { Document, model, Schema } from 'mongoose';

export interface BlacklistedUser extends Document {
  email: String;
}

const blacklistSchema = new Schema({
    email: String,
});

export default model<BlacklistedUser>('BlacklistedUser', blacklistSchema);