// A utility function to connect to MongoDB


import mongose from "mongoose";
export const mongoConnect = async () => {
    const { MONGO_URI } = process.env;
    const dbOptions = {
        user:process.env.MONGO_USER_NAME,
        pass:process.env.MONGO_PASS,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    try {
        await mongose.connect(MONGO_URI, dbOptions)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error(error);
        console.log("Could not connect to MongoDB, Please check the MongoDB URI")
    }
}