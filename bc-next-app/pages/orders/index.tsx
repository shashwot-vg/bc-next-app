import { useGetAllOrders } from "../../lib/hooks";
import { useState, useEffect } from "react";
import styles from "../../styles/orders.module.css";

interface OrdersItem {
	id: string;
}
const Orders = () => {
	const [orders, setOrders] = useState<OrdersItem[]>([]);
	const [err, setError] = useState(null);

	const { data, error, isLoading } = useGetAllOrders();
	console.log(data);
	useEffect(() => {
		if (data) {
			setOrders(data);
		}
		if (err) {
			setError(error);
		}
	}, [data, err]);

	if (isLoading) {
		return <div className={styles.loading}>Loading...</div>;
	}

	if (err) {
		return <div className={styles.errorMessage}>Failed to load orders: {err}</div>;
	}

	return (
		<div className={styles.ordersContainer}>
			{orders?.map((order) => (
				<div key={order.id} className={styles.orderItem}>
					Order id: {order.id}
				</div>
			))}
		</div>
	);
};

export default Orders;
