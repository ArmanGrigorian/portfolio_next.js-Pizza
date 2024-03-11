type MouseTouchEvent<T extends HTMLElement> = MouseEvent<T> | TouchEvent<T>;
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

type CardInfoProps = {
	image: string;
	blur: string;
	title: string;
}

type ParamsButtonProps = {
	children: React.ReactNode;
	styles: string;
}

type PriceTagProps = {
	activePrice: number;	
	prices: number[];
}