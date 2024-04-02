import Image from "next/image";

export default function CardInfo(pizza: T_cartPizza) {
	return (
		<div className="w-64 flex items-center gap-2 max-sm:flex-col max-sm:gap-1">
			<Image
				src={pizza.image}
				width={96}
				height={96}
				blurDataURL={pizza.blur}
				placeholder="blur"
				alt={`pizza ${pizza.title} image`}
			/>

			<div className="text-center">
				<h3 className="text-custom-black text-lg font-semibold">{pizza.title}</h3>

				<p className="text-custom-grey-dark text-base font-medium">
					{pizza.activeDough}, {pizza.activeSize}sm.
				</p>
			</div>
		</div>
	);
}
