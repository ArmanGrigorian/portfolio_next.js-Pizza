import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

import { LOCAL_DATA } from "../../../../DATA";

const initialState: productsState = {
	menuProducts: LOCAL_DATA,
	cartProducts: [],
};

export const productsSlice = createSlice({
	name: "products",

	initialState: initialState,

	reducers: {
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
					console.log(product.activePrice, payload.idx);
					return {
						...product,
						activePrice: payload.idx,
					};
				}
				return product;
			});
		},
		updateMenuProduct: (state, { payload }: PayloadAction<T_pizza>) => {
			const { origin_id, counts, prices, activePrice, totalPrice } = payload;

			state.menuProducts = state.menuProducts.map((product) => {
				if (product.origin_id === origin_id) {
					return {
						...product,
						counts: counts.map((count) => {
							if (count === counts[activePrice]) {
								return count + 1;
							}
							return count;
						}),
						totalPrice: totalPrice + prices[activePrice],
					};
				}
				return product;
			});
		},

		addToCart: (state, { payload }: PayloadAction<T_pizza>) => {
			const { id, origin_id, title, image, blur, counts, prices, sizes, activePrice, activeDough } =
				payload;

			const newCartProduct: T_cartPizza = {
				id: id,
				origin_id: origin_id,
				title: title,
				image: image,
				blur: blur,
				count: counts[activePrice],
				price: prices[activePrice],
				activeSize: sizes[activePrice],
				activeDough: activeDough,
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
							price: product.price + newCartProduct.price,
						};
					}
					return product;
				});
			} else {
				state.cartProducts = [
					...state.cartProducts,
					{
						...newCartProduct,
						id: crypto.randomUUID(),
						count: 1,
					},
				];
			}

			console.log(state.cartProducts);
		},
	},
});

export const { updateMenuProduct, addToCart, changeActivePrice, changeActiveDough } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products;
export const selectMenuProducts = (state: RootState) => state.products.menuProducts;
export const selectCartProducts = (state: RootState) => state.products.cartProducts;

export default productsSlice.reducer;
