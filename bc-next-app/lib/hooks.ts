import useSWR from "swr";
import { useSession } from "../context/session";
import axios from "axios";

interface ErrorProps extends Error {
	status?: number;
}

async function fetcher(fullUrl: string) {
	try {
		const response = await axios.get(`${fullUrl}`);
		return response.data;
	} catch (error) {
		throw error;
	}
}

export function useGetAllCollections() {
	const { context } = useSession();

	const params = new URLSearchParams({ context }).toString();
	//Use an array to send multiple arguments to fetcher

	if (context) {
		const fullUrl = `/api/collections?${params}`;

		const { data, error } = useSWR(fullUrl, fetcher);
		return { data, error, isLoading: !data && !error };
	} else {
		return { data: null, error: "some error", isLoading: false };
	}
}

export function useGetAllOrders() {
	const { context } = useSession();
	console.log("context fetched inside hook",context);
	const params = new URLSearchParams({ context }).toString();

	// Use an array to send multiple arguments to fetcher
	const fullUrl = context ? `/api/orders?${params}` : null;
	const { data, error } = useSWR(fullUrl, fetcher);

	return { data, error, isLoading: !data && !error };
}

export function useGetAllProducts() {
	const { context } = useSession();

	const params = new URLSearchParams({ context }).toString();
	// Request is deduped and cached; Can be shared across components
	const fullUrl = context ? `/api/products?${params}` : null;
	const { data, error } = useSWR(fullUrl, fetcher);
	return {
		data,
		error,
		isLoading: !data && !error,
	};
}
