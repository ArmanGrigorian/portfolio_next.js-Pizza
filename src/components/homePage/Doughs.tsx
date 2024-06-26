"use client";

import { fetchChangeActiveDough } from "@/lib/features/products/productsSlice";
import { useAppDispatch } from "@/lib/hook";
import { MouseEvent } from "react";

export default function Doughs(pizza: T_pizza) {
	const dispatch = useAppDispatch();


	async function handleChangeDough(e: MouseEvent<HTMLButtonElement>, pizza: T_pizza) {
		const target = e.target as HTMLButtonElement;
		dispatch(fetchChangeActiveDough({ pizza, dough: target.dataset.dough || "thin" }));
	}

	return (
		<>
			{pizza.doughs.map((dough, idx) => (
				<button
					key={idx}
					type="button"
					title={dough}
					data-dough={dough}
					onClick={(e) => handleChangeDough(e, pizza)}
					className={`${
						dough === pizza.activeDough && "bg-custom-white"
					} w-full text-center py-1 rounded shadow-sm text-custom-black text-sm font-normal transition hover:bg-custom-white disabled:active:scale-95`}>
					{dough}
				</button>
			))}
		</>
	);
}
