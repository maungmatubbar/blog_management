import mongoose from "mongoose";
import env from '.././utils/validateEnv';
const connection = env.MONGO_CONECTION_STRING;
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(connection);
        console.log(`Conntected to MongoDB ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error in MongoDB ${error}`);
    }
}

export default connectDB;