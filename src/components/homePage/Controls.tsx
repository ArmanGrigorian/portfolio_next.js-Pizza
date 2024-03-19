"use client";

import { fetchAddToCart } from "@/lib/features/products/productsSlice";
import { useAppDispatch } from "@/lib/hook";

export default function Controls(pizza: T_pizza) {
	const { counts, activePrice, totalPrice } = pizza;
	const dispatch = useAppDispatch();

	async function handleClick(pizza: T_pizza) {
		dispatch(fetchAddToCart(pizza));
	}

	return (
		<div className="w-full py-2 flex justify-between items-center">
			<strong className="text-custom-black text-sm font-bold">{totalPrice} &#36;</strong>

			<button
				type="button"
				title="Add to cart"
				onClick={()=> handleClick(pizza)}
				className="px-3 py-0.5 border-2 border-custom-orange text-custom-orange text-sm font-bold rounded-lg shadow transition hover:bg-custom-orange hover:text-custom-white active:scale-95">
				Add {counts[activePrice]}
			</button>
		</div>
	);
}
