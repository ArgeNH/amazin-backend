import mongoose from 'mongoose';

mongoose.connect(`${process.env.MONGO_URI}`)
    .then(() => console.log("Connected to database"))
    .catch(err => console.error(`Could not connect to MongoDB: ${err.message}`));

export { mongoose };