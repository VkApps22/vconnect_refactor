import mongoose from 'mongoose';
import env from './env';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const mongo = {
  connect: async () => {
    await mongoose.connect(global.__MONGO_URI__ || env.MONGODB_URI, options);
    mongoose.Schema.Types.String.checkRequired((v) => typeof v === 'string');

    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        process.exit(0);
      });
    });

    mongoose.connection.on('error', (err) => {
      console.error(`Mongoose! connection error: ${err}`);
    });
  },
  disconnect: async () => {
    await mongoose.disconnect();
  },
  clear: async () => {
    const { collections } = mongoose.connection;

    const results = [];
    Object.keys(collections).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(collections, key))
        results.push(collections[key].deleteMany());
    });

    await Promise.all(results);
  },
};

export default mongo;
