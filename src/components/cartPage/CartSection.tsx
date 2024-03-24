"use client";

import { fetchCartProducts, selectCartProducts } from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect } from "react";
import { CartCard, CartHeading, Empty } from ".";

export default function CartSection() {
	const dispatch = useAppDispatch();
	const cartProducts = useAppSelector(selectCartProducts);
	const [parent] = useAutoAnimate();

	useEffect(() => {
		dispatch(fetchCartProducts());
	}, [dispatch]);

	if (cartProducts.length === 0) return <Empty />;

	return (
		<section>
			<CartHeading />
			<div ref={parent} className="flex flex-col justify-start items-center gap-5 p-5 max-sm:p-3">
				{cartProducts.map((product) => (
					<CartCard key={product.cart_id} {...product} />
				))}
			</div>
		</section>
	);
}
