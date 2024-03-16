"use client";

import {
	fetchCartProducts,
	fetchMenuProducts,
	selectMenuProducts,
	selectProducts,
} from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useGetMenuProductsQuery } from "@/lib/services/productsApi";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect } from "react";
import { MenuCard, MenuSkeleton, Pagination } from ".";


export default function Menu() {
	const dispatch = useAppDispatch();
	const menuProducts = useAppSelector(selectMenuProducts);
	const [parent] = useAutoAnimate();
	const { activeCategory, activeSort, activePage } = useAppSelector(selectProducts);

	const {
		isFetching,
		isLoading,
	} = useGetMenuProductsQuery({
		activeCategory,
		activeSort,
		activePage,
	});

	useEffect(() => {
		dispatch(fetchMenuProducts({ activeCategory, activeSort, activePage }));
		dispatch(fetchCartProducts());
	}, [activeCategory, activePage, activeSort, dispatch]);

	if (isFetching || isLoading) return <MenuSkeleton />;

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
}
