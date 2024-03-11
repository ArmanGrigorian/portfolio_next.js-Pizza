"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cartPic from "../../../public/icons/cart.png";
import arrowPic from "../../../public/icons/arrow.png";

export default function Button() {
	const pathname = usePathname();

	if (pathname === "/") {
		return (
			<Link
				tabIndex={0}
				title="to cart"
				href="/cart"
				className="select-none w-32 h-12 flex justify-center items-center gap-2 bg-custom-orange rounded-3xl shadow-xl transition hover:bg-custom-black active:scale-95 max-sm:w-28 max-xsm:rounded-2xl max-xsm:w-16 max-xsm:h-11">
				<span className="text-custom-white text-base font-bold max-sm:text-sm max-xsm:hidden">
					5 &#36;
				</span>

				<div className="flex justify-center items-center gap-1 border-l-2 border-custom-white pl-2 max-xsm:border-none max-xsm:pl-0">
					<Image src={cartPic} width={16} height={16} alt="cart png" priority />
					<span className="text-custom-white text-base font-bold max-sm:text-sm">1</span>
				</div>
			</Link>
		);
	} else if (pathname === "/cart") {
		return (
			<Link
				tabIndex={0}
				title="to home"
				href="/"
				className="select-none w-32 h-12 flex justify-center items-center gap-2 bg-custom-orange rounded-3xl shadow-xl transition hover:bg-custom-black active:scale-95 max-sm:w-28 max-xsm:rounded-2xl max-xsm:w-20 max-xsm:h-11">
				<div className="flex justify-center items-center gap-1">
					<Image
						src={arrowPic}
						width={0}
						height={0}
						alt="cart png"
						className="max-xsm:hidden w-4 h-auto"
					/>
					<span className="text-custom-white text-base font-bold max-sm:text-sm">Back</span>
				</div>
			</Link>
		);
	}
}
