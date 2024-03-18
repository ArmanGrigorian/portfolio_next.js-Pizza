"use client";

import { selectProducts } from "@/lib/features/products/productsSlice";
import { useAppSelector } from "@/lib/hook";
import { useChangeActivePriceMutation } from "@/lib/services/productsApi";
import { MouseEvent } from "react";

export default function Sizes(pizza: T_pizza) {
	const { sizes, activePrice } = pizza;
	const productsState = useAppSelector(selectProducts);
	const [changeActivePrice] = useChangeActivePriceMutation();

	async function handleChangeSize(e: MouseEvent<HTMLButtonElement>, pizza: T_pizza) {
		const target = e.target as HTMLButtonElement;
		await changeActivePrice({ productsState, pizza, idx: Number(target.dataset.idx) });
	}

	return (
		<>
			{sizes.map((size, idx) => (
				<button
					key={idx}
					type="button"
					title={`${size} sm`}
					data-idx={idx}
					onClick={(e) => handleChangeSize(e, pizza)}
					className={`${
						size === sizes[activePrice] && "bg-custom-white"
					} w-full text-center py-1 rounded shadow-sm text-custom-black text-sm font-normal transition hover:bg-custom-white disabled:active:scale-95`}>
					{size} sm
				</button>
			))}
		</>
	);
}
