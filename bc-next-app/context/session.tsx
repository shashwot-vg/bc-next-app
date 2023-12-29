import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { bigCommerceSDK } from "../scripts/bcSdk";

const SessionContext = createContext({ context: "" });

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
	const { query } = useRouter();
	const [context, setContext] = useState("");

	useEffect(() => {
		const fetchContext = async () => {
			if (query.context instanceof Promise) {
				const resolvedContext = await query.context;
				console.log("Resolved context:", resolvedContext);
				setContext(resolvedContext.toString());
				// bigCommerceSDK(resolvedContext);
			} else if (query.context) {
				console.log("query.context-token captured by sessionfile", query.context);
				setContext(query.context.toString());
				// bigCommerceSDK(query.context);
			}
		};

		fetchContext();
	}, [query.context]);

	return <SessionContext.Provider value={{ context }}>{children}</SessionContext.Provider>;
};

export const useSession = () => useContext(SessionContext);

export default SessionProvider;
