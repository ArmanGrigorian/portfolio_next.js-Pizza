"use client";

import { selectProducts, setActivePage } from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import ReactPaginate from "react-paginate";

export default function Pagination() {
	const dispatch = useAppDispatch();
	const { totalPages, activePage } = useAppSelector(selectProducts);

	function handlePageClick(data: { selected: number }) {
		dispatch(setActivePage(data.selected));
	}

	return (
		<>
			<ReactPaginate
				forcePage={activePage - 1}
				previousLabel={"🍕 Previous"}
				nextLabel={"Next 🍕"}
				breakLabel={". 🍕 ."}
				pageCount={totalPages}
				marginPagesDisplayed={2}
				pageRangeDisplayed={2}
				onPageChange={handlePageClick}
				containerClassName="pt-8 pb-11 flex justify-center items-center gap-5 max-sm:gap-4"
				pageLinkClassName="w-11 h-11 flex justify-center items-center rounded-xl shadow select-none text-base text-custom-black font-semibold bg-custom-grey-light transition hover:bg-custom-black hover:text-custom-white active:scale-95 max-sm:text-sm max-sm:w-9 max-sm:h-9 max-sm:rounded-lg max-xsm:w-7 max-xsm:h-7 max-xsm:text-xs"
				previousLinkClassName="bg-custom-grey-light w-32 h-11 flex justify-center items-center rounded-xl shadow select-none text-base text-custom-black font-semibold transition hover:bg-custom-black hover:text-custom-white active:scale-95 max-sm:text-sm max-sm:w-24 max-sm:h-9 max-sm:rounded-lg max-xsm:w-20 max-xsm:h-7 max-xsm:text-xs"
				nextLinkClassName="bg-custom-grey-light w-32 h-11 flex justify-center items-center rounded-xl shadow select-none text-base text-custom-black font-semibold transition hover:bg-custom-black hover:text-custom-white active:scale-95 max-sm:text-sm max-sm:w-24 max-sm:h-9 max-sm:rounded-lg max-xsm:w-20 max-xsm:h-7 max-xsm:text-xs"
				breakLinkClassName="bg-custom-grey-light w-32 h-11 flex justify-center items-center rounded-xl shadow select-none text-base text-custom-black font-semibold transition hover:bg-custom-black hover:text-custom-white active:scale-95 max-sm:text-sm max-sm:w-24 max-sm:h-9 max-sm:rounded-lg"
				activeLinkClassName="bg-custom-yellow w-11 h-11 flex justify-center items-center rounded-xl shadow select-none text-base text-custom-black font-semibold  transition hover:bg-custom-black hover:text-custom-white active:scale-95 max-sm:text-sm max-sm:w-9 max-sm:h-9 max-sm:rounded-lg"
			/>
		</>
	);
}
