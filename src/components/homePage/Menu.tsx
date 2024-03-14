"use client";

import { selectMenuProducts } from "@/lib/features/products/productsSlice";
import { useAppSelector } from "@/lib/hook";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { MenuCard, Pagination } from "."

export default function Menu() {
	const menuProducts = useAppSelector(selectMenuProducts);
	const [parent] = useAutoAnimate();

	return (
		<>
			<div
				ref={parent}
				className="flex flex-wrap justify-around items-start gap-x-7 gap-y-11 p-5 pb-10 max-sm:p-3 max-sm:pb-8">
				{menuProducts.map((pizza) => (
					<MenuCard key={pizza.origin_id} {...pizza} />
				))}
			</div>
			<Pagination/>
		</>
	);
}
