"use client";

import { selectProducts } from "@/lib/features/products/productsSlice";
import { useAppSelector } from "@/lib/hook";
import {
	useRemoveItemFromCartMutation,
	useResetItemCountMutation,
} from "@/lib/services/productsApi";

export default function RemoveButton(pizza: T_cartPizza) {
	const { menuProducts, cartProducts } = useAppSelector(selectProducts);
	const [removeItemFromCart] = useRemoveItemFromCartMutation();
	const [resetItemCount] = useResetItemCountMutation();

	async function handleClick(pizza: T_cartPizza) {
		await removeItemFromCart({ cartProducts, pizza });
		await resetItemCount({ menuProducts, pizza });
	}

	return (
		<button
			type="button"
			title="Remove from cart"
			onClick={() => handleClick(pizza)}
			className="w-10 h-10 border rounded-md text-custom-grey-dark text-base font-black transition hover:bg-custom-black hover:text-custom-white active:scale-95 max-sm:w-2/3 max-sm:rounded-xl">
			X
		</button>
	);
}
