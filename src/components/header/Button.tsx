import Image from "next/image";
import Link from "next/link";
import cartPic from "../../../public/icons/cart.png";

export default function Button() {
	return (
		<Link
			href="/cart"
			className="select-none w-32 h-12 flex justify-center items-center gap-2 bg-custom-orange rounded-3xl shadow-xl hover:bg-custom-black active:scale-95 max-sm:w-28 max-xsm:rounded-2xl max-xsm:w-16 max-xsm:h-11">
			<span className="text-custom-white text-base font-bold max-sm:text-sm max-xsm:hidden">
				5 &#36;
			</span>

			<div className="flex justify-center items-center gap-1 border-l-2 border-custom-white pl-2 max-xsm:border-none max-xsm:pl-0">
				<Image src={cartPic} width={18} height={18} alt="cart png" priority />
				<span className="text-custom-white text-base font-bold max-sm:text-sm">1</span>
			</div>
		</Link>
	);
}
