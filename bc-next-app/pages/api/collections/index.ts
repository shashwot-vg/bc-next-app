import { getSession } from "../../../lib/services/authServices";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function collections(req: NextApiRequest, res: NextApiResponse) {
	try {
		const session = await getSession(req);
		// Check if session is defined
		if (!session) {
			return res.status(401).json({ message: "Session not found" });
		}

		const accessToken = session.accessToken as string;
		const storeHash = session.storeHash as string;
		const url = `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/categories`;

		const options = {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"X-Auth-Token": accessToken,
			},
		};
		const response = await axios(url, options);

		const data = response.data.data;
		res.status(200).json(data);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
}
