import axios from "axios";

// this API is used in AsyncThunk, once I find the right way to
// set the initial state using an RTK query this API will be removed

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
	baseURL: BASE_URL,
});

export const productsAPI = {
	getAllProducts: () => {
		return instance.get("/menu");
	},
	getMenuProducts: (activePage: number) => {
		return instance.get(
			`/menu?&page=${activePage}&limit=8`,
		);
	},
	getCartProducts: () => {
		return instance.get("/cart");
	},
	getActualId: (params: getActualIdParams) => {
		if (params.cart_id) {
			return instance.get(`/cart?cart_id=${params.cart_id}`);
		}
		return instance.get(
			`/cart?title=${params.title}&activeDough=${params.activeDough}&activeSize=${params.activeSize}`,
		);
	},
	patchMenu: (body: T_pizzas) => {
		return instance.patch("/menu", body);
	},
	patchCart: (body: T_cartPizzas) => {
		return instance.patch("/cart", body);
	},
	patchMenuItem: (id: number, body: T_pizza) => {
		return instance.patch(`/menu/${id}`, body);	
	},
	patchCartItem: (id: number, body: T_cartPizza) => {
		return instance.patch(`/cart/${id}`, body);	
	},
	postCartItem: (body: T_cartPizza) => {
		return instance.post("/cart", body);
	}
};
