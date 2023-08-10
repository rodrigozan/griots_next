import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = 'mongodb://localhost:27017/griots';
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDB;
