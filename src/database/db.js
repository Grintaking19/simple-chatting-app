import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    }
    catch(error){
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    try{
        await mongoose.connection.close();
        console.log("Disconnected from MongoDB");
    }
    catch(error){
        console.error("Error disconnecting from MongoDB:", error);
    }
};

// Event listeners for MongoDB connection
mongoose.connection.on("connected", () => {
    console.log("MongoDB connection established");
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB connection disconnected");
});


export { connectDB, disconnectDB };
