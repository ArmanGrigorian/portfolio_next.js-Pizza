"use client";

import { fetchChangeActivePrice } from "@/lib/features/products/productsSlice";
import { useAppDispatch } from "@/lib/hook";
import { MouseEvent } from "react";

export default function Sizes(pizza: T_pizza) {
	const dispatch = useAppDispatch();

	async function handleChangeSize(e: MouseEvent<HTMLButtonElement>, pizza: T_pizza) {
		const target = e.target as HTMLButtonElement;
		dispatch(fetchChangeActivePrice({ pizza, idx: Number(target.dataset.idx) }));
	}

	return (
		<>
			{pizza.sizes.map((size, idx) => (
				<button
					key={idx}
					type="button"
					title={`${size} sm`}
					data-idx={idx}
					onClick={(e) => handleChangeSize(e, pizza)}
					className={`${
						size === pizza.sizes[pizza.activePrice] && "bg-custom-white"
					} w-full text-center py-1 rounded shadow-sm text-custom-black text-sm font-normal transition hover:bg-custom-white disabled:active:scale-95`}>
					{size} sm
				</button>
			))}
		</>
	);
}
