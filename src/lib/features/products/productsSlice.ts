import { updateCountsAndTotalPrice } from "@/utils/helpers";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LOCAL_DATA } from "../../../../DATA";
import type { RootState } from "../../store";

const initialState: productsState = {
	menuProducts: LOCAL_DATA,
	cartProducts: [],
	activeCategory: "",
	activeSort: "title",
};

export const productsSlice = createSlice({
	name: "products",

	initialState: initialState,

	reducers: {
		setMenuProducts: (state, { payload }: PayloadAction<T_pizzas>) => {
			state.menuProducts = payload;
		},
		setActiveCategory: (state, { payload }: PayloadAction<string>) => {
			state.activeCategory = payload;
		},
		setActiveSort: (state, { payload }: PayloadAction<string>) => {
			state.activeSort = payload;
		},
		changeActiveDough: (state, { payload }: PayloadAction<{ pizza: T_pizza; dough: string }>) => {
			const { origin_id } = payload.pizza;

			state.menuProducts = state.menuProducts.map((product) => {
				if (product.origin_id === origin_id) {
					return {
						...product,
						activeDough: payload.dough,
					};
				}
				return product;
			});
		},
		changeActivePrice: (state, { payload }: PayloadAction<{ pizza: T_pizza; idx: number }>) => {
			const { origin_id } = payload.pizza;

			state.menuProducts = state.menuProducts.map((product) => {
				if (product.origin_id === origin_id) {
					return {
						...product,
						activePrice: payload.idx,
					};
				}
				return product;
			});
		},
		addToCart: (state, { payload }: PayloadAction<T_pizza>) => {
			const { id, ...pizzaData } = payload;
			const { origin_id, counts, sizes, prices, activePrice, totalPrice } = pizzaData;

			state.menuProducts = state.menuProducts.map((product) => {
				if (product.origin_id === origin_id) {
					return updateCountsAndTotalPrice(product, activePrice, true);
				}
				return product;
			});

			const newCartProduct: T_cartPizza = {
				...pizzaData,
				cart_id: crypto.randomUUID(),
				count: counts[activePrice],
				price: Number(prices[activePrice].toFixed(2)),
				activeSize: sizes[activePrice],
			};

			const search = state.cartProducts.find((product) => {
				if (
					product.title === newCartProduct.title &&
					product.activeDough === newCartProduct.activeDough &&
					product.activeSize === newCartProduct.activeSize
				)
					return true;
				return false;
			});

			if (search) {
				state.cartProducts = state.cartProducts.map((product) => {
					if (
						product.title === newCartProduct.title &&
						product.activeDough === newCartProduct.activeDough &&
						product.activeSize === newCartProduct.activeSize
					) {
						return {
							...product,
							count: product.count + 1,
							price: Number((product.price + newCartProduct.price).toFixed(2)),
						};
					}
					return product;
				});
			} else {
				state.cartProducts = [
					...state.cartProducts,
					{
						...newCartProduct,
						cart_id: crypto.randomUUID(),
						count: 1,
					},
				];
			}
		},
		incrementCount: (state, { payload }: PayloadAction<T_cartPizza>) => {
			const { origin_id, cart_id, count, activePrice, price } = payload;
			const basePrice = Number((price / count).toFixed(2));

			state.cartProducts = state.cartProducts.map((product) => {
				if (product.cart_id === cart_id) {
					return {
						...product,
						count: count + 1,
						price: Number((price + basePrice).toFixed(2)),
					};
				}
				return product;
			});

			state.menuProducts = state.menuProducts.map((product) => {
				if (product.origin_id === origin_id) {
					return updateCountsAndTotalPrice(product, activePrice, true);
				}
				return product;
			});
		},
		decrementCount: (state, { payload }: PayloadAction<T_cartPizza>) => {
			if (payload.count === 1) return;

			const { origin_id, cart_id, count, activePrice, price } = payload;
			const basePrice = Number((price / count).toFixed(2));

			state.cartProducts = state.cartProducts.map((product) => {
				if (product.cart_id === cart_id) {
					return {
						...product,
						count: count - 1,
						price: Number((price - basePrice).toFixed(2)),
					};
				}
				return product;
			});

			state.menuProducts = state.menuProducts.map((product) => {
				if (product.origin_id === origin_id) {
					return updateCountsAndTotalPrice(product, activePrice, false);
				}
				return product;
			});
		},
		removeItemFromCart: (state, { payload }: PayloadAction<T_cartPizza>) => {
			const { origin_id, count, cart_id, activePrice, price } = payload;

			state.cartProducts = state.cartProducts.filter((product) => product.cart_id !== cart_id);

			state.menuProducts = state.menuProducts.map((product) => {
				if (product.origin_id === origin_id) {
					return {
						...product,
						counts: product.counts.map((val, idx) => {
							if (idx === activePrice) return val - count;
							return val;
						}),
						totalPrice: Number((product.totalPrice - price).toFixed(2)),
					};
				}
				return product;
			});
		},
		clearCart: (state) => {
			state.cartProducts = [];

			state.menuProducts = state.menuProducts.map((product) => {
				return {
					...product,
					counts: product.counts.map((val) => (val = 0)),
					totalPrice: 0,
				};
			});
		},
	},
});

export const {
	setMenuProducts,
	setActiveCategory,
	setActiveSort,
	addToCart,
	changeActivePrice,
	changeActiveDough,
	incrementCount,
	decrementCount,
	removeItemFromCart,
	clearCart,
} = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products;
export const selectActiveSort = (state: RootState) => state.products.activeSort;
export const selectMenuProducts = (state: RootState) => state.products.menuProducts;
export const selectCartProducts = (state: RootState) => state.products.cartProducts;

export default productsSlice.reducer;
