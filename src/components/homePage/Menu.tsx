"use client";

import {
	fetchCartProducts,
	fetchMenuProducts,
	selectMenuProducts,
	selectProducts,
} from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect } from "react";
import { MenuCard, MenuSkeleton, Pagination } from ".";
import { notFound } from "next/navigation";

export default function Menu() {
	const dispatch = useAppDispatch();
	const menuProducts = useAppSelector(selectMenuProducts);
	const [parent] = useAutoAnimate();
	const { activePage, loadingState } = useAppSelector(selectProducts);

	useEffect(() => {
		dispatch(fetchMenuProducts(activePage));
		dispatch(fetchCartProducts());
	}, [activePage, dispatch]);

	if (loadingState === "loading") {
		return <MenuSkeleton />;
	} else if (loadingState === "success") {
		return (
			<>
				<div
					ref={parent}
					className="flex flex-wrap justify-around items-start gap-x-7 gap-y-11 p-5 pb-10 max-sm:p-3 max-sm:pb-8">
					{menuProducts.map((pizza) => (
						<MenuCard key={pizza.origin_id} {...pizza} />
					))}
				</div>
				<Pagination />
			</>
		);
	} else if (loadingState === "error") {
		return notFound();
	}
}
