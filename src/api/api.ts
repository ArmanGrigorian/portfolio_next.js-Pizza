import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
	baseURL: BASE_URL,
});

export const productsAPI = {
	getMenuProducts: (params: getMenuProductsParams) => {
		const { activeCategory, activeSort, activePage } = params;
		// return instance.get("/menu");
		return instance.get(
			`/menu?&page=${activePage}&limit=8&categories=*${activeCategory}&sortBy=${activeSort}`,
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
};
