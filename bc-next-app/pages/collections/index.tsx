import { useGetAllCollections } from "../../lib/hooks";
import { useState, useEffect } from "react";
import styles from "../../styles/collections.module.css";

interface CollectionItem {
	id: string;
	name: string;
}

const Collections = () => {
	const [collections, setCollections] = useState<CollectionItem[]>([]);
	const [err, setError] = useState(null);

	const { data, error, isLoading } = useGetAllCollections();
	useEffect(() => {
		if (data) {
			setCollections(data);
		}
		if (err) {
			setError(error);
		}
	}, [data, err]);

	if (isLoading) {
		return <div className={styles.loading}>Loading...</div>;
	}

	if (err) {
		return <div className={styles.errorMessage}>Failed to load collections: {err}</div>;
	}

	return (
		<div className={styles.collectionsContainer}>
			{collections?.map((collection) => (
				<div key={collection.id} className={styles.collectionItem}>
					{collection.name}
				</div>
			))}
		</div>
	);
};

export default Collections;
