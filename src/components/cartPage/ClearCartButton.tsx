"use client";

import { fetchClearCart } from "@/lib/features/products/productsSlice";
import { useAppDispatch } from "@/lib/hook";
import Image from "next/image";
import trashPic from "../../../public/icons/trash.png";

export default function ClearCartButton() {
	const dispatch = useAppDispatch();

	async function handleClick() {
		dispatch(fetchClearCart([]));
	}

	return (
		<button
			type="button"
			title="Clear cart"
			onClick={handleClick}
			className="w-32 flex justify-center items-center gap-2 text-custom-grey-dark text-lg font-medium rounded-md py-1 shadow transition active:scale-95 max-sm:w-28">
			<Image src={trashPic} width={20} height={20} alt="cart png" className="max-sm:hidden" />
			Clear Cart
		</button>
	);
}
