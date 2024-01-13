import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`Mongo DB is connected !! Conection Details= ${connectionInstance}`);
    } catch (error) {
        console.error("db/indexDB.js Error= ",error);
        process.exit(1);
    }
}

export default connectDB;