import Image from "next/image";

export default function CardInfo(pizza: T_cartPizza) {
  const { image, blur, title, activeDough, activeSize } = pizza;
  
	return (
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
	);
}
