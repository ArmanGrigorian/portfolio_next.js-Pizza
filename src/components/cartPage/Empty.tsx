import Image from "next/image";
import cartPic from "../../../public/images/shoppingCart.png";

export default function Empty() {
	return (
		<section className="relative flex justify-center items-center min-h-[calc(100dvh-168px)] max-sm:min-h-[calc(100dvh-136px)]">
			<div className="absolute z-10 inset-0 m-auto w-fit h-fit">
				<h2 className="text-custom-black text-3xl font-extrabold">Cart is empty</h2>
				<p className="text-custom-grey-dark text-base font-medium">
					You haven&apos;t ordered pizza yet
				</p>
			</div>

			<Image
				src={cartPic}
				width={512}
				height={512}
				alt="shopping cart png"
				blurDataURL="../../../public/blur/shoppingCartBlur.webp"
				placeholder="blur"
				priority
				className="object-contain"
			/>
		</section>
	);
}
