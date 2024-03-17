// after crud operation we need to update counts and total price
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

// get event page x for slider
export function getEventPageX(e: MouseTouchEvent<HTMLUListElement>) {
	if (e.type === "touchstart") {
		return (e as TouchEvent).touches[0].pageX;
	} else {
		return (e as MouseEvent).pageX;
	}
}


// get total count and total price of cart
export function getTotals(cartProducts: T_cartPizzas): T_total {
	if (cartProducts.length === 0 || !cartProducts) return { count: 0, price: 0 };

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

// generate id from pizza params
export function generateIdFromParams(pizza: T_cartPizza): string {
	return (pizza.title + pizza.activeDough + pizza.activeSize).toLowerCase();
}
