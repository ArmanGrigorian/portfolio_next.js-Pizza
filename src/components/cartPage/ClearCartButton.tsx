"use client";

import { productsAPI } from "@/api/api";
import { useClearCartMutation, useResetCountsMutation } from "@/lib/services/productsApi";
import Image from "next/image";
import trashPic from "../../../public/icons/trash.png";

export default function ClearCartButton() {
	const [clearCart] = useClearCartMutation();
	const [resetCounts] = useResetCountsMutation();

	async function handleClick() {
		await clearCart("");
		const { data } = await productsAPI.getAllProducts();
		await resetCounts(data);
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
