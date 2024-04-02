import { CardInfo, Controls, PizzaParams, PriceTag } from ".";

export default function MenuCard(pizza: T_pizza) {
	return (
		<div className="relative w-64 flex flex-col items-center gap-2 p-3 shadow rounded-3xl transition hover:shadow-xl hover:-translate-y-1">
			<CardInfo
				origin_id={pizza.origin_id}
				image={pizza.image}
				blur={pizza.blur}
				title={pizza.title}
			/>

			<PizzaParams {...pizza} />

			<Controls {...pizza} />

			<PriceTag activePrice={pizza.activePrice} prices={pizza.prices} />
		</div>
	);
}
