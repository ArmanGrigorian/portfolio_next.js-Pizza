"use client";

import { fetchCartProducts, selectCartProducts } from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useEffect } from "react";
import { CartContent, CartHeading, Empty } from ".";

export default function CartSection() {
	const dispatch = useAppDispatch();
	const cartProducts = useAppSelector(selectCartProducts);

	useEffect(() => {
		dispatch(fetchCartProducts());
	}, [dispatch]);

	if (cartProducts.length === 0) return <Empty />;

	return (
		<section>
			<CartHeading />
			<CartContent />
		</section>
	);
}
