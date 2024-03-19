type MouseTouchEvent<T extends HTMLElement> = MouseEvent<T> | TouchEvent<T>;

type T_cartPizza = {
	id?: number;
	origin_id: number;
	cart_id?: string;
	title: string;
	image: string;
	blur: string;
	price: number;
	count: number;
	activeSize: string;
	activeDough: string;
	activePrice: number;
};

type T_cartPizzas = T_cartPizza[];

type T_pizza = {
	id: number;
	origin_id: number;
	title: string;
	categories: string[];
	image: string;
	blur: string;
	prices: number[];
	counts: number[];
	doughs: string[];
	sizes: string[];
	activeDough: string;
	activePrice: number;
	totalPrice: number;
};

type T_pizzas = T_pizza[];

type CardInfoProps = {
	image: string;
	blur: string;
	title: string;
	origin_id: number;
};

type ParamsButtonProps = {
	children: React.ReactNode;
	title: string;
	idx: number;
	styles: string;
};

type PizzaPageProps = {
	params: {
		origin_id: string;
	};
};

type PriceTagProps = {
	activePrice: number;
	prices: number[];
};

type OptionProps = {
	children: React.ReactNode;
	value: string;
};

type StrongProps = {
	children: React.ReactNode;
	value: number | string;
};

interface sliderState {
	isMouseDown: boolean;
	startX: number;
	scrollLeft: number;
	mouseMoveX: number;
}

type activateSliderPayload = {
	startX: number;
	scrollLeft: number;
};

type setProductsPayload = {
	menu: T_pizzas;
	cart: T_cartPizzas;
};

interface productsState {
	initialProducts: T_pizzas;
	initialProducts: T_pizzas;
	menuProducts: T_pizzas;
	cartProducts: T_cartPizzas;
	activeCategory: string;
	activeSort: string;
	activePage: number;
	totalPages: number;
	menuCategories: string[];
	loadingState: "loading" | "success" | "error";
}

type T_total = {
	count: number;
	price: number;
};

type getActualIdParams = {
	cart_id?: string;
	title?: string;
	activeDough?: string;
	activeSize?: string;
};

type RootLayoutProps = {
	children: React.ReactNode;
	modal: React.ReactNode;
};

type menuProductsPayload = {
	items: T_pizzas;
	meta: {
		current_page: number;
		per_page: number;
		remaining_count: number;
		total_items: number;
		total_pages: number;
	};
};
