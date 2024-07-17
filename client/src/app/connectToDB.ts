import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

const connectToDB = async () => {
  try {
    if (connection.isConnected) {
      return true;
    }

    const db = await mongoose.connect(process.env.MONGODB_URI!);

    connection.isConnected = db.connections[0].readyState;

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default connectToDB;
