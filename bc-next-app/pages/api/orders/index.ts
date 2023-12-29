import { getSession } from "../../../lib/services/authServices";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function getAllOrders(req: NextApiRequest, res: NextApiResponse) {
	try {
		const session = await getSession(req);

		const accessToken = session?.accessToken as string;
		const storeHash = session?.storeHash as string;

		// const bigcommerce = bigcommerceClient(accessToken, storeHash);
		// const response = await bigcommerce.get(`/catalog/categories/}`);
		console.log("inside getAllOrders api");
		let url = `https://api.bigcommerce.com/stores/${storeHash}/v2/orders`;

		let options = {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"X-Auth-Token": accessToken,
			},
		};
		const response = await axios(url, options);
		const data = response.data;

		res.status(200).json(data);
	} catch (error) {
		res.status(500).send(error);
	}
}
