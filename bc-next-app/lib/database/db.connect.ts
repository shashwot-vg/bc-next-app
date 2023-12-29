import mongoose, { Error } from "mongoose";

async function connectToDatabase(): Promise<void> {
	try {
		await mongoose.connect(process.env.DATABASEURI as string);
		console.log("Connected to the database");
	} catch (error) {
		console.log(error);
	}
}

export default connectToDatabase;
