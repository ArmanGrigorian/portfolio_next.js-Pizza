type T_total = {
	count: number;
	price: number;
};

export function getTotals(cartProducts: T_cartPizzas): T_total {
	return cartProducts.reduce(
		(totals, product) => {
			totals.count += product.count;
			totals.price += product.price * product.count;
			return totals;
		},
		{
			count: 0,
			price: 0,
		},
	);
}
