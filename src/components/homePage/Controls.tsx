"use client";
import { addToCartOptimistic, selectProducts } from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useUpdateMenuProductMutation } from "@/lib/services/productsApi";
import { useAddToCartMutation } from "@/lib/services/productsApi";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Controls(pizza: T_pizza) {
	const { title, counts, activePrice, activeDough, sizes, totalPrice } = pizza;
	const dispatch = useAppDispatch();
	const [updateMenuProduct] = useUpdateMenuProductMutation();
	const [addToCart] = useAddToCartMutation();
	const productsState = useAppSelector(selectProducts);
	const searchUrl = `${BASE_URL}/cart?title=${title}&activeDough=${activeDough}&activeSize=${sizes[activePrice]}`;

	async function handleClick() {
		dispatch(addToCartOptimistic(pizza));
		const req = await fetch(searchUrl).then((res) => res.json());
		const actual_id = await req[0]?.id;
		await addToCart({ productsState, pizza, actual_id });
		await updateMenuProduct({ productsState, pizza });
	}

	return (
		<div className="w-full py-2 flex justify-between items-center">
			<strong className="text-custom-black text-sm font-bold">{totalPrice} &#36;</strong>

			<button
				type="button"
				title="Add to cart"
				onClick={handleClick}
				className="px-3 py-0.5 border-2 border-custom-orange text-custom-orange text-sm font-bold rounded-lg shadow transition hover:bg-custom-orange hover:text-custom-white active:scale-95">
				Add {counts[activePrice]}
			</button>
		</div>
	);
}
