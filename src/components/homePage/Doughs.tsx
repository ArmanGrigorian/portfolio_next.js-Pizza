"use client";

import { changeActiveDough } from "@/lib/features/products/productsSlice";
import { useAppDispatch } from "@/lib/hook";
import { MouseEvent } from "react";

export default function Doughs(pizza: T_pizza) {
	const { activeDough, doughs } = pizza;
  const dispatch = useAppDispatch();
  
	function handleChangeDough(e: MouseEvent<HTMLButtonElement>) {
		const target = e.target as HTMLButtonElement;
		dispatch(changeActiveDough({ pizza, dough: target.dataset.dough || "thin" }));
  }
  
	return (
		<>
			{doughs.map((dough, idx) => (
				<button
					key={idx}
					type="button"
					title={dough}
					data-dough={dough}
					onClick={handleChangeDough}
					className={`${
						dough === activeDough && "bg-custom-white"
					} w-full text-center py-1 rounded shadow-sm text-custom-black text-sm font-normal transition hover:bg-custom-white disabled:active:scale-95`}>
					{dough}
				</button>
			))}
		</>
	);
}
