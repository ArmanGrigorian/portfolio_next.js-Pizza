"use client";

import { addToCart } from "@/lib/features/products/productsSlice";
import { useAppDispatch } from "@/lib/hook";
import { CardInfo, PizzaParams, PriceTag } from ".";

export default function MenuCard(pizza: T_pizza) {
	const { title, image, blur, counts, prices, activePrice, totalPrice } = pizza;
	const dispatch = useAppDispatch();


	function handleClick() {
		dispatch(addToCart(pizza));
	}

	return (
		<div className="relative w-64 flex flex-col items-center gap-2 p-3 shadow rounded-3xl transition hover:shadow-xl hover:-translate-y-1">
			<CardInfo image={image} blur={blur} title={title} />

			<PizzaParams {...pizza} />

			<div className="w-full py-2 flex justify-between items-center">
				<strong className="text-custom-black text-sm font-bold">
					{totalPrice} &#36;
				</strong>

				<button
					type="button"
					title="Add to cart"
					onClick={handleClick}
					className="px-3 py-0.5 border-2 border-custom-orange text-custom-orange text-sm font-bold rounded-lg shadow transition hover:bg-custom-orange hover:text-custom-white active:scale-95">
					Add {counts[activePrice]}
				</button>
			</div>

			<PriceTag activePrice={activePrice} prices={prices} />
		</div>
	);
}
