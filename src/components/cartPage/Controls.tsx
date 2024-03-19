"use client";

import { fetchManageCount } from "@/lib/features/products/productsSlice";
import { useAppDispatch } from "@/lib/hook";

export default function Controls(pizza: T_cartPizza) {
	const { count } = pizza;
	const dispatch = useAppDispatch();

	async function handleIncrement(pizza: T_cartPizza) {
		dispatch(fetchManageCount({ pizza, increment: true }));
	}

	async function handleDecrement(pizza: T_cartPizza) {
		if (count === 1) return;
		dispatch(fetchManageCount({ pizza, increment: false }));
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
