import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
	baseURL: BASE_URL,
});

export const productsAPI = {
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
