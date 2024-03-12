"use client";

import { selectCartProducts } from "@/lib/features/products/productsSlice";
import { useAppSelector } from "@/lib/hook";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { CartCard } from ".";

export default function CartContent() {
  const [parent] = useAutoAnimate();
  const cartProducts = useAppSelector(selectCartProducts)

    return (
      <div
        ref={parent}
        className="flex flex-col justify-start items-center gap-5 p-5 max-sm:p-3"
        >
				{cartProducts.map((product) => (
          <CartCard key={product.cart_id} {...product} />
				))}
			</div>
		);
}
