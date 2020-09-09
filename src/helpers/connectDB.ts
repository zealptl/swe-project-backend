import { connect } from 'mongoose';

export const connectDB = async (dbURI: string | undefined) => {
  try {
    if (!dbURI) {
      throw Error('dbURI not found');
    }

    await connect(dbURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
