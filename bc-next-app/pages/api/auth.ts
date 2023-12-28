import { NextApiRequest, NextApiResponse } from "next";
const BigCommerce = require("node-bigcommerce");

const { AUTH_CALLBACK, CLIENT_ID, CLIENT_SECRET } = process.env;
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	try {
		console.log("inside auth api");
		// Authenticate the app on install
		const bigcommerce = new BigCommerce({
			clientId: CLIENT_ID,
			secret: CLIENT_SECRET,
			callback: AUTH_CALLBACK,
			responseType: "json",
		});

		const authResponse = await bigcommerce.authorize(req.query);
		console.log(authResponse);
		res.status(200).json({ ok: "ok" });
	} catch (error) {
		res.status(500).json({ message: "error in auth api" });
	}
}
