import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const StoreAndUserCredentialsSchema = new Schema({
	record_id: {
		type: String,
		default: uuidv4,
		unique: true,
	},
	storeHash: { type: String, required: true },
	user_id: { type: String, required: true },
	accessToken: { type: String, required: true },
});

// Check if the model exists before creating it
export const StoreAndUserCredentials =
	mongoose.models.StoreAndUserCredentials ||
	mongoose.model("StoreAndUserCredentials", StoreAndUserCredentialsSchema);
