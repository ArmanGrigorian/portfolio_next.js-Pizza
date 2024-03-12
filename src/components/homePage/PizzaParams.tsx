"use client";

import { changeActiveDough, changeActivePrice } from "@/lib/features/products/productsSlice";
import { useAppDispatch } from "@/lib/hook";
import { MouseEvent } from "react";
import { ParamsDiv } from ".";

export default function PizzaParams(pizza: T_pizza) {
	const { activeDough, sizes, doughs, activePrice } = pizza;
	const dispatch = useAppDispatch();

	function handleChangeSize(e: MouseEvent<HTMLButtonElement>) {
		const target = e.target as HTMLButtonElement;
		dispatch(changeActivePrice({ pizza, idx: Number(target.dataset.idx) }));
	}

	function handleChangeDough(e: MouseEvent<HTMLButtonElement>) {
		const target = e.target as HTMLButtonElement;
		dispatch(changeActiveDough({ pizza, dough: target.dataset.dough || "thin" }));
	}

	return (
		<div className="w-full bg-custom-grey-light p-2 rounded-lg shadow-sm flex flex-col gap-2">
			<ParamsDiv>
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
			</ParamsDiv>

			<ParamsDiv>
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
			</ParamsDiv>
		</div>
	);
}
