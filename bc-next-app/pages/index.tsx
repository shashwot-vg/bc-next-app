import Link from "next/link";
import styles from "../styles/index.module.css"; // Adjust the path as needed

export default function Home() {
	return (
		<main className={styles.container}>
			<h5 className={styles.title}>BigCommerce App</h5>
			<div>
				<Link href="/collections" passHref>
					<button className={`${styles.button} ${styles.buttonBlue}`}>Collections</button>
				</Link>
				<Link href="/orders" passHref>
					<button className={`${styles.button} ${styles.buttonGreen}`}>Orders</button>
				</Link>
				<Link href="/products" passHref>
					<button className={`${styles.button} ${styles.buttonRed}`}>Products</button>
				</Link>
			</div>
		</main>
	);
}
