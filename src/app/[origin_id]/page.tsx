import { Description, DoughsParagraph, SizesParagraph, Title } from "@/components";
import Image from "next/image";

const MENU_URL = process.env.MENU_URL!;

export default async function PizzaPage({ params }: PizzaPageProps) {
	const { origin_id } = params;
	const response = await fetch(MENU_URL + "/" + origin_id, { next: { revalidate: 3600 } });
	const pizza: T_pizza = await response.json();
	const { title, image, blur, prices, sizes, doughs } = pizza;

	return (
		<>
			<Image
				src={image}
				width={256}
				height={256}
				alt={`${title} image`}
				blurDataURL={blur}
				placeholder="blur"
				className="object-contain"
			/>

			<div className="flex flex-col items-center gap-5 max-sm:gap-3">
				<Title title={title} />
				<Description title={title} />
				<DoughsParagraph doughs={doughs} />
				<SizesParagraph sizes={sizes} prices={prices} />
			</div>
		</>
	);
}
