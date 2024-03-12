import Image from "next/image";

export default function CartCard(product: T_cartPizza) {
	const { image, blur, title, activeDough, activeSize, count, price } = product;

	return (
		<div className="w-full flex justify-between items-center gap-1 px-6 py-3 rounded-3xl shadow transition hover:shadow-lg hover:-translate-y-0.5 max-sm:flex-col max-sm:p-3 max-sm:gap-5 max-sm:w-2/3 max-xsm:w-full">
			<div className="w-64 flex items-center gap-2 max-sm:flex-col max-sm:gap-1">
				<Image
					src={image}
					width={96}
					height={96}
					blurDataURL={blur}
					placeholder="blur"
					alt={`pizza ${title} image`}
				/>

				<div className="text-center">
					<h3 className="text-custom-black text-lg font-semibold">{title}</h3>

					<p className="text-custom-grey-dark text-base font-medium">
						{activeDough}, {activeSize}sm.
					</p>
				</div>
			</div>

			<div className="flex items-center gap-3 max-sm:w-full max-sm:justify-evenly">
				<button
					type="button"
					title="decrement"
					className="border w-10 h-10 rounded-full text-custom-grey-dark text-base font-black transition hover:bg-custom-black hover:text-custom-white active:scale-95">
					-
				</button>

				<span className="text-custom-black text-base font-semibold">{count}</span>

				<button
					type="button"
					title="increment"
					className="border w-10 h-10 rounded-full text-custom-grey-dark text-base font-black transition hover:bg-custom-black hover:text-custom-white active:scale-95">
					+
				</button>
			</div>

			<strong className="text-custom-black text-base font-semibold">{price} &#36;</strong>

			<button
				type="button"
				title="Remove from cart"
				className="w-10 h-10 border rounded-md text-custom-grey-dark text-base font-black transition hover:bg-custom-black hover:text-custom-white active:scale-95 max-sm:w-2/3 max-sm:rounded-xl">
				X
			</button>
		</div>
	);
}
