"use client";

import { productsAPI } from "@/api/api";
import { selectProducts } from "@/lib/features/products/productsSlice";
import { useAppSelector } from "@/lib/hook";
import {
	useManageCountInCartMutation,
	useManageCountInMenuMutation,
} from "@/lib/services/productsApi";

export default function Controls(pizza: T_cartPizza) {
	const { cart_id, count } = pizza;
	const { menuProducts, cartProducts } = useAppSelector(selectProducts);
	const [manageCountInCart] = useManageCountInCartMutation();
	const [manageCountInMenu] = useManageCountInMenuMutation();

	async function handleIncrement(pizza: T_cartPizza) {
		const { data } = await productsAPI.getActualId({ cart_id });
		const actual_id = data[0]?.id;
		await manageCountInCart({ cartProducts, pizza, actual_id, increment: true });
		await manageCountInMenu({ menuProducts, pizza, increment: true });
	}

	async function handleDecrement(pizza: T_cartPizza) {
		if (count === 1) return;
		const { data } = await productsAPI.getActualId({ cart_id });
		const actual_id = data[0].id;
		await manageCountInCart({ cartProducts, pizza, actual_id, increment: false });
		await manageCountInMenu({ menuProducts, pizza, increment: false });
	}

	return (
		<div className="flex items-center gap-3 max-sm:w-full max-sm:justify-evenly">
			<button
				type="button"
				title="decrement"
				onClick={() => handleDecrement(pizza)}
				className={`${
					count === 1 && "opacity-0 cursor-default"
				} border w-10 h-10 rounded-full text-custom-grey-dark text-base font-black transition hover:bg-custom-black hover:text-custom-white active:scale-95`}>
				-
			</button>

			<span className="text-custom-black text-base font-semibold">{count}</span>

			<button
				type="button"
				title="increment"
				onClick={() => handleIncrement(pizza)}
				className="border w-10 h-10 rounded-full text-custom-grey-dark text-base font-black transition hover:bg-custom-black hover:text-custom-white active:scale-95">
				+
			</button>
		</div>
	);
}
