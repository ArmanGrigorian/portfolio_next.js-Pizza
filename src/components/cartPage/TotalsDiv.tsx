"use client";

import { selectCartProducts } from "@/lib/features/products/productsSlice";
import { useAppSelector } from "@/lib/hook";
import { getTotals } from "@/utils/getTotals";
import Strong from "./Strong";

export default function TotalsDiv() {
	const cartProducts = useAppSelector(selectCartProducts);
	const total = getTotals(cartProducts);

	return (
		<div className="flex flex-col">
			<Strong value={total.count}>Total Count</Strong>
			<Strong value={`${total.price} $`}>Total Price</Strong>
		</div>
	);
}
