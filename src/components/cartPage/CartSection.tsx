"use client";

import { selectCartProducts } from "@/lib/features/products/productsSlice";
import { useAppSelector } from "@/lib/hook";
import { CartContent, CartHeading, Empty } from ".";

export default function CartSection() {
	const cartProducts = useAppSelector(selectCartProducts);

	if (cartProducts.length === 0) return <Empty />;

	return (
		<section>
			<CartHeading />
			<CartContent />
		</section>
	);
}
