import * as jwt from "jsonwebtoken";
import { StoreAndUserCredentials } from "../database/models/stores_users.model";

export function createJWTToken(session: any) {
	const contextString = session?.context ?? session?.sub;
	const storeHash = contextString?.split("/")[1] || "";
	const user_id = session.user?.id;

	const token = jwt.sign({ storeHash, user_id }, process.env.JWT_KEY as string, { expiresIn: "24h" });
	return token;
}

interface JwtPayloadCustom {
	storeHash: string;
	user_id: string;
}

export async function getSession({ query: { context = "" } }) {
	if (typeof context !== "string") return;
	const { storeHash, user_id } = decodePayload(context);

	const dbResponse = await StoreAndUserCredentials.findOne({ storeHash: storeHash, user_id: user_id });
	// Before retrieving session/ hitting APIs, check user
	if (dbResponse instanceof StoreAndUserCredentials) {
		return {
			accessToken: dbResponse.accessToken as string,
			storeHash: dbResponse.storeHash as string,
		};
	} else {
		throw new Error("User is not available. Please login or ensure you have access permissions.");
	}
}

export function decodePayload(token: string) {
	const decoded = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayloadCustom;
	return decoded;
}
