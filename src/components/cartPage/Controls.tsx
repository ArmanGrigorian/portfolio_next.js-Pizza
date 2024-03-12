"use client";

import { decrementCount, incrementCount } from "@/lib/features/products/productsSlice";
import { useAppDispatch } from "@/lib/hook";

export default function Controls(pizza: T_cartPizza) {
	const { count } = pizza;
	const dispatch = useAppDispatch();

	function handleIncrement() {
		dispatch(incrementCount(pizza));
	}

	function handleDecrement() {
		dispatch(decrementCount(pizza));
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
