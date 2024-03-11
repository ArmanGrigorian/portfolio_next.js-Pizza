import { CartSection, Purchase } from "@/components";

export default function CartPage() {
	return (
		<main className="max-w-7xl mx-auto bg-custom-white">
			<Purchase />
			<CartSection/>
		</main>
	);
}
