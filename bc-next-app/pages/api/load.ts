import connectToDatabase from "@/lib/database/db.connect";
import { createJWTToken } from "@/lib/services/authServices";
import { saveStoreData } from "@/lib/services/saveStoreData";
import { NextApiRequest, NextApiResponse } from "next";
const BigCommerce = require("node-bigcommerce");

const { CLIENT_SECRET } = process.env;

// const buildRedirectUrl = async (url: string, token: string) => {
// 	console.log("url builder called");
// 	console.log("url", url);
// 	const [path, query = ""] = url.split("?");
// 	console.log("path", path);
// 	const queryParams = await new URLSearchParams(`context=${token}&${query}`);
// 	console.log("queryParams", queryParams);
// 	const finalurl = `${path}?${queryParams}`;
// 	console.log("finalurl", finalurl);
// 	return finalurl;
// };
export default async function load(req: NextApiRequest, res: NextApiResponse) {
	try {
		await connectToDatabase();
		console.log("inside load api");
		console.log("req.query", req.query);
		const bigCommerce = await new BigCommerce({
			secret: CLIENT_SECRET,
			responseType: "json",
		});

		const response1 = await bigCommerce.verify(req.query["signed_payload"]);
		console.log("response1 from bc verify", response1);
		// const response2 = await bigCommerce.verify(req.query["signed_payload_jwt"]);
		// console.log("response2 from bc verify", response2);
		const token = createJWTToken(response1);
		console.log("token sent from load api", token);
		const tokenString = token.toString();

		res.redirect(302, `/?context=${tokenString}`);
	} catch (error) {
		res.status(500).send(error);
	}
}
