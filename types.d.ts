type T_pizza = {
	id: number;
	origin_id: number;
	title: string;
	categories: string[];
	image: string;
	blur: string;
	prices: number[];
	count: number;
	doughs: string[];
	sizes: string[];
	activeDough: string;
	activePrice: number;
};

type T_pizzas = T_pizza[];
