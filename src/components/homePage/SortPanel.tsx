"use client";

import { setActiveSort } from "@/lib/features/products/productsSlice";
import { useAppDispatch } from "@/lib/hook";
import { ChangeEvent } from "react";

export default function SortPanel() {
	const dispatch = useAppDispatch();

	function handleChange(e: ChangeEvent<HTMLSelectElement>) {
		dispatch(setActiveSort(e.target.value.toLowerCase()));
	}

	return (
		<div className="flex items-center gap-2">
			<p className="text-custom-black text-base font-medium">Sort by :</p>
			<div className="px-2 py-1 border rounded">
				<select
					name="sort"
					onChange={handleChange}
					className="w-full outline-offset-4 outline-custom-orange text-custom-orange text-base font-medium">
					<option defaultChecked value="title" className="text-custom-black text-base font-normal">
						name &#40; A to Z &#41;
					</option>
					<option value="-title" className="text-custom-black text-base font-normal">
						name &#40; Z to A &#41;
					</option>
					<option value="prices" className="text-custom-black text-base font-normal">
						price ascending
					</option>
					<option value="-prices" className="text-custom-black text-base font-normal">
						price descending
					</option>
				</select>
			</div>
		</div>
	);
}
