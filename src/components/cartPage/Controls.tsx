"use client";

import {
	decrementCountOptimistic,
	incrementCountOptimistic,
	selectProducts,
} from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
	useDecrementCountInCartMutation,
	useIncrementCountInCartMutation,
	useDecrementCountInMenuMutation,
	useIncrementCountInMenuMutation,
} from "@/lib/services/productsApi";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Controls(pizza: T_cartPizza) {
	const { cart_id, count } = pizza;
	const dispatch = useAppDispatch();
	const { menuProducts, cartProducts } = useAppSelector(selectProducts);
	const [incrementCountInCart] = useIncrementCountInCartMutation();
	const [decrementCountInCart] = useDecrementCountInCartMutation();
	const [incrementCountInMenu] = useIncrementCountInMenuMutation();
	const [decrementCountInMenu] = useDecrementCountInMenuMutation();
	const searchUrl = `${BASE_URL}/cart?cart_id=${cart_id}`;

	async function handleIncrement() {
		dispatch(incrementCountOptimistic(pizza));
		const req = await fetch(searchUrl).then((res) => res.json());
		const actual_id = await req[0]?.id;
		await incrementCountInCart({ cartProducts, pizza, actual_id });
		await incrementCountInMenu({ menuProducts, pizza });
	}

	async function handleDecrement() {
		if (count === 1) return;
		dispatch(decrementCountOptimistic(pizza));
		const req = await fetch(searchUrl).then((res) => res.json());
		const actual_id = await req[0]?.id;
		await decrementCountInCart({ cartProducts, pizza, actual_id });
		await decrementCountInMenu({ menuProducts, pizza });
	}

	return (
		<div className="flex items-center gap-3 max-sm:w-full max-sm:justify-evenly">
			<button
				type="button"
				title="decrement"
				onClick={handleDecrement}
				className={`${
					count === 1 && "opacity-0 cursor-default"
				} border w-10 h-10 rounded-full text-custom-grey-dark text-base font-black transition hover:bg-custom-black hover:text-custom-white active:scale-95`}>
				-
			</button>

			<span className="text-custom-black text-base font-semibold">{count}</span>

			<button
				type="button"
				title="increment"
				onClick={handleIncrement}
				className="border w-10 h-10 rounded-full text-custom-grey-dark text-base font-black transition hover:bg-custom-black hover:text-custom-white active:scale-95">
				+
			</button>
		</div>
	);
}
