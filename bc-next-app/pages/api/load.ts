import { NextApiRequest, NextApiResponse } from "next";
const BigCommerce = require("node-bigcommerce");

const { CLIENT_SECRET } = process.env;
export default async function load(req: NextApiRequest, res: NextApiResponse) {
	try {
		console.log("inside load api");
		const bigCommerce = new BigCommerce({
			secret: CLIENT_SECRET,
			responseType: "json",
		});

		const data = bigCommerce.verify(req.query["signed_payload"]);
		res.redirect(302, `/?context=${data}`);
		console.log(data);
	} catch (error) {
		res.status(500).json({ message: "error in auth api" });
	}
}
