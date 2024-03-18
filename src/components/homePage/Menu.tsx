"use client";

import {
	fetchCartProducts,
	fetchMenuProducts,
	selectProducts,
} from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useGetMenuProductsQuery } from "@/lib/services/productsApi";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect } from "react";
import { MenuCard, MenuSkeleton, Pagination } from ".";

export default function Menu() {
	const dispatch = useAppDispatch();
	const [parent] = useAutoAnimate();
	const { activeCategory, activeSort, activePage } = useAppSelector(selectProducts);

	const { data, isFetching, isLoading } = useGetMenuProductsQuery({
		activeCategory,
		activeSort,
		activePage,
	});

	useEffect(() => {
		dispatch(fetchMenuProducts({ activeCategory, activeSort, activePage }));
		dispatch(fetchCartProducts());
	}, [activeCategory, activePage, activeSort, dispatch]);

	if (isFetching || isLoading) return <MenuSkeleton />;
	else if (data) {
		return (
			<>
				<div
					ref={parent}
					className="flex flex-wrap justify-around items-start gap-x-7 gap-y-11 p-5 pb-10 max-sm:p-3 max-sm:pb-8">
					{data.items.map((pizza: T_pizza) => (
						<MenuCard key={pizza.origin_id} {...pizza} />
					))}
				</div>
				<Pagination />
			</>
		);
	}
}
