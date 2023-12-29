import { NextApiRequest, NextApiResponse } from "next";
const BigCommerce = require("node-bigcommerce");
import { createJWTToken } from "../../lib/services/authServices";
import { saveStoreData } from "../../lib/services/saveStoreData";
import connectToDatabase from "@/lib/database/db.connect";
const { AUTH_CALLBACK, CLIENT_ID, CLIENT_SECRET } = process.env;
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	try {
		await connectToDatabase();
		// Authenticate the app on install
		const bigcommerce = await new BigCommerce({
			clientId: CLIENT_ID,
			secret: CLIENT_SECRET,
			callback: AUTH_CALLBACK,
			responseType: "json",
		});

		const authResponse = await bigcommerce.authorize(req.query);
		await saveStoreData(authResponse);
		const token = createJWTToken(authResponse);
		console.log("token sent from auth api", token);
		res.redirect(302, `/?context=${token}`);
	} catch (error) {
		res.status(500).json({ message: error });
	}
}
