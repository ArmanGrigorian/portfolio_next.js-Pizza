"use client";

import {
	fetchCartProducts,
	selectProducts,
	setActivePage,
	setMenuCategories,
	setMenuProducts,
	setTotalPages,
} from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useGetMenuProductsQuery } from "@/lib/services/productsApi";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { LOCAL_DATA } from "../../../DATA";

export default function Pagination() {
	const dispatch = useAppDispatch();
	const { activeCategory, activeSort, activePage, totalPages } = useAppSelector(selectProducts);
	const { data: menuData, isSuccess } = useGetMenuProductsQuery({
		activeCategory,
		activeSort,
		activePage,
	});

	useEffect(() => {
		if (isSuccess && menuData) {
			dispatch(setMenuProducts(menuData.items));
			dispatch(setMenuCategories(menuData.items));
			dispatch(setTotalPages(menuData.meta.total_pages));
		} else {
			dispatch(setMenuProducts(LOCAL_DATA));
			dispatch(setMenuCategories(LOCAL_DATA));
			dispatch(setTotalPages(2));
		}
		dispatch(fetchCartProducts());
	}, [dispatch, isSuccess, menuData]);

	function handlePageClick(data: { selected: number }) {
		dispatch(setActivePage(data.selected + 1));
	}

	return (
		<>
			<ReactPaginate
				previousLabel={"🍕 Previous"}
				nextLabel={"Next 🍕"}
				breakLabel={". 🍕 ."}
				pageCount={2}
				marginPagesDisplayed={2}
				pageRangeDisplayed={2}
				onPageChange={handlePageClick}
				containerClassName="pt-8 pb-11 flex justify-center items-center gap-5 max-sm:gap-4"
				pageLinkClassName="w-11 h-11 flex justify-center items-center rounded-xl shadow select-none text-base text-custom-black font-semibold bg-custom-grey-light transition hover:bg-custom-black hover:text-custom-white active:scale-95 max-sm:text-sm max-sm:w-9 max-sm:h-9 max-sm:rounded-lg"
				previousLinkClassName="bg-custom-grey-light w-32 h-11 flex justify-center items-center rounded-xl shadow select-none text-base text-custom-black font-semibold transition hover:bg-custom-black hover:text-custom-white active:scale-95 max-sm:text-sm max-sm:w-28 max-sm:h-9 max-sm:rounded-lg"
				nextLinkClassName="bg-custom-grey-light w-32 h-11 flex justify-center items-center rounded-xl shadow select-none text-base text-custom-black font-semibold transition hover:bg-custom-black hover:text-custom-white active:scale-95 max-sm:text-sm max-sm:w-24 max-sm:h-9 max-sm:rounded-lg"
				breakLinkClassName="bg-custom-grey-light w-32 h-11 flex justify-center items-center rounded-xl shadow select-none text-base text-custom-black font-semibold transition hover:bg-custom-black hover:text-custom-white active:scale-95 max-sm:text-sm max-sm:w-24 max-sm:h-9 max-sm:rounded-lg"
				activeLinkClassName="bg-custom-yellow w-11 h-11 flex justify-center items-center rounded-xl shadow select-none text-base text-custom-black font-semibold  transition hover:bg-custom-black hover:text-custom-white active:scale-95 max-sm:text-sm max-sm:w-9 max-sm:h-9 max-sm:rounded-lg"
			/>
		</>
	);
}
