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
		return instance.get(`/menu?&page=${activePage}&limit=8`);
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
