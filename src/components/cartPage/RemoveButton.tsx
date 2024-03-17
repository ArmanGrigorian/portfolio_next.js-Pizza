"use client";

import { fetchRemoveItemFromCart } from "@/lib/features/products/productsSlice";
import { useAppDispatch } from "@/lib/hook";

export default function RemoveButton(pizza: T_cartPizza) {
	const dispatch = useAppDispatch();

	async function handleClick() {
		dispatch(fetchRemoveItemFromCart(pizza));
	}

	return (
		<button
			type="button"
			title="Remove from cart"
			onClick={handleClick}
			className="w-10 h-10 border rounded-md text-custom-grey-dark text-base font-black transition hover:bg-custom-black hover:text-custom-white active:scale-95 max-sm:w-2/3 max-sm:rounded-xl">
			X
		</button>
	);
}
