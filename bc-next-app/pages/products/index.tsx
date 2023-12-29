import { useGetAllProducts } from "../../lib/hooks";
import { useState, useEffect } from "react";
import styles from "../../styles/products.module.css";
interface ProductItem {
	id: string;
	name: string; // Assuming each product has an 'id' and 'name'
}

const Products = () => {
	const [products, setProducts] = useState<ProductItem[]>([]);
	const [err, setError] = useState<string | null>(null);

	const { data, error, isLoading } = useGetAllProducts();

	useEffect(() => {
		if (data) {
			setProducts(data);
		}
		if (error) {
			setError(error);
		}
	}, [data, error]);

	if (isLoading) {
		return <div className={styles.loading}>Loading...</div>;
	}

	if (err) {
		return <div className={styles.errorMessage}>Failed to load products: {err}</div>;
	}

	return (
		<div className={styles.productsContainer}>
			{products.map((product) => (
				<div key={product.id} className={styles.productItem}>
					{product.name}
				</div>
			))}
		</div>
	);
};

export default Products;
