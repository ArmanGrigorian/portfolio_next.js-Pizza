"use client";

import {
	removeItemFromCartOptimistic,
	selectProducts,
} from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
	 useResetItemCountMutation,
	useRemoveItemFromCartMutation,
} from "@/lib/services/productsApi";

export default function RemoveButton(pizza: T_cartPizza) {
	const dispatch = useAppDispatch();
	const { menuProducts, cartProducts } = useAppSelector(selectProducts);
	const [removeItemFromCart] = useRemoveItemFromCartMutation();
	const [resetItemCount] = useResetItemCountMutation();

	async function handleClick() {
		dispatch(removeItemFromCartOptimistic(pizza));
		await removeItemFromCart({ cartProducts, pizza });
		await resetItemCount({ menuProducts, pizza });
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
