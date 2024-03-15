import { CardInfo, Controls, PizzaParams, PriceTag } from ".";

export default function MenuCard(pizza: T_pizza) {
	const { title, image, blur, prices, activePrice, origin_id } = pizza;

	return (
		<div className="relative w-64 flex flex-col items-center gap-2 p-3 shadow rounded-3xl transition hover:shadow-xl hover:-translate-y-1">
			<CardInfo
				origin_id={origin_id}
				image={image}
				blur={blur}
				title={title} />

			<PizzaParams {...pizza} />

			<Controls {...pizza} />

			<PriceTag activePrice={activePrice} prices={prices} />
		</div>
	);
}
