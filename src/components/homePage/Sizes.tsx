"use client";

import { changeActivePrice } from "@/lib/features/products/productsSlice";
import { useAppDispatch } from "@/lib/hook";
import { MouseEvent } from "react";

export default function Sizes(pizza: T_pizza) {
	const { sizes, activePrice } = pizza;
	const dispatch = useAppDispatch();

	function handleChangeSize(e: MouseEvent<HTMLButtonElement>) {
		const target = e.target as HTMLButtonElement;
		dispatch(changeActivePrice({ pizza, idx: Number(target.dataset.idx) }));
	}

	return (
		<>
			{sizes.map((size, idx) => (
				<button
					key={idx}
					type="button"
					title={`${size} sm`}
					data-idx={idx}
					onClick={handleChangeSize}
					className={`${
						size === sizes[activePrice] && "bg-custom-white"
					} w-full text-center py-1 rounded shadow-sm text-custom-black text-sm font-normal transition hover:bg-custom-white disabled:active:scale-95`}>
					{size} sm
				</button>
			))}
		</>
	);
}
