import connectToDatabase from "../database/db.connect";
import { StoreAndUserCredentials } from "../database/models/stores_users.model";

export async function saveStoreData(session: any): Promise<void> {
	const contextString = session?.context ?? session?.sub;
	const storeHash = contextString?.split("/")[1] || "";
	const user_id = session.user?.id;
	const accessToken = session.access_token;

	try {
		await connectToDatabase(); // Ensure the database connection is open

		await StoreAndUserCredentials.findOneAndUpdate(
			{ storeHash, user_id }, // Find a document with this storeHash and user_id
			{ storeHash, user_id, accessToken }, // Update these fields
			{ upsert: true, new: true, setDefaultsOnInsert: true } // Upsert options
		);

		return;
	} catch (error) {
		console.error("Error in upserting document:", error);
		throw error; // or handle the error as needed
	}
}
