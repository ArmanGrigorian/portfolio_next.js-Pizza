import { productsAPI } from "@/api/api";
import { generateIdFromParams, updateCountsAndTotalPrice } from "@/utils/helpers";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export const fetchCartProducts = createAsyncThunk("products/fetchCartProducts", async () => {
	try {
		const { data } = await productsAPI.getCartProducts();
		return data;
	} catch (err) {
		console.error(err);
	}
});

const initialState: productsState = {
	menuProducts: [],
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
		setCartProducts: (state, { payload }: PayloadAction<T_cartPizzas | []>) => {
			state.cartProducts = payload;
		},
		setActiveCategory: (state, { payload }: PayloadAction<string>) => {
			state.activeCategory = payload;
		},
		setActiveSort: (state, { payload }: PayloadAction<string>) => {
			state.activeSort = payload;
		},
		changeActiveDoughOptimistic: (
			state,
			{ payload }: PayloadAction<{ pizza: T_pizza; dough: string }>,
		) => {
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
		changeActivePriceOptimistic: (
			state,
			{ payload }: PayloadAction<{ pizza: T_pizza; idx: number }>,
		) => {
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
		addToCartOptimistic: (state, { payload }: PayloadAction<T_pizza>) => {
			const { id, categories, counts, doughs, prices, sizes, totalPrice, ...pizzaData } = payload;
			const { origin_id, activePrice } = pizzaData;

			state.menuProducts = state.menuProducts.map((product) => {
				if (product.origin_id === origin_id) {
					return updateCountsAndTotalPrice(product, activePrice, true);
				}
				return product;
			});

			const newCartProduct: T_cartPizza = {
				...pizzaData,
				count: counts[activePrice],
				price: Number(prices[activePrice].toFixed(2)),
				activeSize: sizes[activePrice],
			};

			const search = state.cartProducts.find(
				(product) =>
					product.title === newCartProduct.title &&
					product.activeDough === newCartProduct.activeDough &&
					product.activeSize === newCartProduct.activeSize,
			);

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
						cart_id: generateIdFromParams(newCartProduct),
						count: 1,
					},
				];
			}
		},
		incrementCountOptimistic: (state, { payload }: PayloadAction<T_cartPizza>) => {
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
		decrementCountOptimistic: (state, { payload }: PayloadAction<T_cartPizza>) => {
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
		removeItemFromCartOptimistic: (state, { payload }: PayloadAction<T_cartPizza>) => {
			const { origin_id, count, cart_id, activePrice, price } = payload;

			state.cartProducts = state.cartProducts.filter((product) => product.cart_id !== cart_id);

			localStorage.setItem("cartProducts", JSON.stringify(state.cartProducts));

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
		clearCartOptimistic: (state) => {
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
	extraReducers: (builder) => {
		builder.addCase(fetchCartProducts.fulfilled, (state, { payload }: PayloadAction<T_cartPizzas>) => {
			state.cartProducts = payload;
		});
		builder.addCase(fetchCartProducts.rejected, (state) => {
			state.cartProducts = [];
		})
	},
});

export const {
	setMenuProducts,
	setCartProducts,
	setActiveCategory,
	setActiveSort,
	addToCartOptimistic,
	changeActivePriceOptimistic,
	changeActiveDoughOptimistic,
	incrementCountOptimistic,
	decrementCountOptimistic,
	removeItemFromCartOptimistic,
	clearCartOptimistic,
} = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products;
export const selectActiveSort = (state: RootState) => state.products.activeSort;
export const selectMenuProducts = (state: RootState) => state.products.menuProducts;
export const selectCartProducts = (state: RootState) => state.products.cartProducts;

export default productsSlice.reducer;
