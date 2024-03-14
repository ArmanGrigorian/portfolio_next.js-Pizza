export function updateCountsAndTotalPrice(
	product: T_pizza,
	activePrice: number,
	increment: boolean = true,
): T_pizza {
	const { counts, totalPrice, prices } = product;

	return {
		...product,
		counts: counts.map((val, idx) =>
			idx === activePrice ? (increment ? (val += 1) : (val -= 1)) : val,
		),
		totalPrice: Number(
			(totalPrice + (increment ? prices[activePrice] : -prices[activePrice])).toFixed(2),
		),
	};
}

export function getEventPageX(e: MouseTouchEvent<HTMLUListElement>) {
	if (e.type === "touchstart") {
		return (e as TouchEvent).touches[0].pageX;
	} else {
		return (e as MouseEvent).pageX;
	}
}

export function getTotals(cartProducts: T_cartPizzas): T_total {
	if (cartProducts.length === 0) return { count: 0, price: 0 };
	
	return cartProducts.reduce(
		(totals, product) => {
			totals.count += product.count;
			totals.price = Number((totals.price + product.price).toFixed(2));
			return totals;
		},
		{
			count: 0,
			price: 0,
		},
	);
}

export function generateIdFromParams(pizza: T_cartPizza) {
	return (pizza.title + pizza.activeDough + pizza.activeSize).toLowerCase();
}
