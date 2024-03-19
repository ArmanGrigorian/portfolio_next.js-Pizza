import { productsAPI } from "@/api/api";
import { generateIdFromParams, updateCountsAndTotalPrice } from "@/utils/helpers";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOCAL_DATA } from "../../../../DATA";
import type { RootState } from "../../store";

export const fetchMenuProducts = createAsyncThunk(
	"products/fetchMenuProducts",
	async (activePage: number) => {
		try {
			const { data: menu } = await productsAPI.getMenuProducts(activePage);
			const { data: allProducts } = await productsAPI.getAllProducts();
			return { menu, allProducts };
		} catch (err) {
			console.error(err);
		}
	},
);

export const fetchCartProducts = createAsyncThunk("products/fetchCartProducts", async () => {
	try {
		const { data } = await productsAPI.getCartProducts();
		return data;
	} catch (err) {
		console.error(err);
	}
});

export const fetchClearCart = createAsyncThunk(
	"products/fetchClearCart",
	async (body: T_cartPizzas, { dispatch }) => {
		dispatch(clearCartOptimistic());

		const { data: menuProducts }: { data: T_pizzas } = await productsAPI.getAllProducts();

		const updatedMenuProducts: T_pizzas = menuProducts.map((product) => {
			return {
				...product,
				counts: product.counts.map((val) => (val = 0)),
				totalPrice: 0,
			};
		});

		try {
			await productsAPI.patchCart(body);
			await productsAPI.patchMenu(updatedMenuProducts);
		} catch (err) {
			console.error(err);
		}
	},
);

export const fetchManageCount = createAsyncThunk(
	"products/fetchManageCount",
	async (
		{
			pizza,
			increment: increment,
		}: {
			pizza: T_cartPizza;
			increment: boolean;
		},
		{ dispatch, getState },
	) => {
		const { products } = getState() as RootState;
		const { cart_id, count, price, origin_id, activePrice } = pizza;
		const basePrice = Number((price / count).toFixed(2));

		const updatedCartProduct = products.cartProducts.reduce((aggr, product) => {
			if (product.cart_id === cart_id) {
				return {
					...product,
					count: increment ? count + 1 : count - 1,
					price: increment
						? Number((price + basePrice).toFixed(2))
						: Number((price - basePrice).toFixed(2)),
				};
			}
			return aggr;
		}, {} as T_cartPizza);

		const updatedMenuProduct = products.menuProducts.reduce((aggr, product) => {
			if (product.origin_id === origin_id) {
				return updateCountsAndTotalPrice(product, activePrice, increment ? true : false);
			}
			return aggr;
		}, {} as T_pizza);

		dispatch(manageCountOptimistic({ pizza, increment }));

		try {
			const { data } = await productsAPI.getActualId({ cart_id });
			const actual_id = data[0]?.id;
			await productsAPI.patchCartItem(actual_id, updatedCartProduct);
			await productsAPI.patchMenuItem(origin_id, updatedMenuProduct);
		} catch (err) {
			console.error(err);
		}
	},
);

export const fetchRemoveItemFromCart = createAsyncThunk(
	"products/fetchRemoveItemFromCart",
	async (pizza: T_cartPizza, { dispatch, getState }) => {
		dispatch(removeItemFromCartOptimistic(pizza));
		const { products } = getState() as RootState;
		const { cart_id, origin_id, count, activePrice, price } = pizza;

		const updatedCartProducts = products.cartProducts.filter(
			(product) => product.cart_id !== cart_id,
		);

		const updatedMenuProducts = products.menuProducts.reduce((aggr, product) => {
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
			return aggr;
		}, {} as T_pizza);

		try {
			await productsAPI.patchCart(updatedCartProducts);
			await productsAPI.patchMenuItem(origin_id, updatedMenuProducts);
		} catch (err) {
			console.error(err);
		}
	},
);

export const fetchAddToCart = createAsyncThunk(
	"products/fetchAddToCart",
	async (pizza: T_pizza, { dispatch, getState }) => {
		const { products } = getState() as RootState;
		const { id, categories, counts, doughs, prices, sizes, totalPrice, ...pizzaData } = pizza;
		const { activePrice, title, activeDough, origin_id } = pizzaData;

		const newCartProduct: T_cartPizza = {
			...pizzaData,
			count: counts[activePrice],
			price: Number(prices[activePrice].toFixed(2)),
			activeSize: sizes[activePrice],
		};

		const search = products.cartProducts.some(
			(product) =>
				product.title === newCartProduct.title &&
				product.activeDough === newCartProduct.activeDough &&
				product.activeSize === newCartProduct.activeSize,
		);

		dispatch(addToCartOptimistic(pizza));

		const updatedMenuProduct = products.menuProducts.reduce((aggr, product) => {
			if (product.origin_id === origin_id) {
				return updateCountsAndTotalPrice(product, activePrice, true);
			}
			return aggr;
		}, {} as T_pizza);

		if (search) {
			const updatedCartItem = products.cartProducts.reduce((aggr, product) => {
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
				return aggr;
			}, {} as T_cartPizza);

			try {
				const { data } = await productsAPI.getActualId({
					title,
					activeDough,
					activeSize: sizes[activePrice],
				});
				const actual_id = data[0]?.id;
				await productsAPI.patchCartItem(actual_id, updatedCartItem);
				await productsAPI.patchMenuItem(origin_id, updatedMenuProduct);
			} catch (err) {
				console.error(err);
			}
		} else {
			try {
				await productsAPI.postCartItem({
					...newCartProduct,
					cart_id: generateIdFromParams(newCartProduct),
					count: 1,
				});
				await productsAPI.patchMenuItem(origin_id, updatedMenuProduct);
			} catch (err) {
				console.error(err);
			}
		}
	},
);

export const fetchChangeActiveDough = createAsyncThunk(
	"products/fetchChangeActiveDough",
	async (
		{
			pizza,
			dough,
		}: {
			pizza: T_pizza;
			dough: string;
		},
		{ dispatch, getState },
	) => {
		dispatch(changeActiveDoughOptimistic({ pizza, dough }));
		const { products } = getState() as RootState;
		const { origin_id } = pizza;

		const updatedMenuProduct = products.menuProducts.reduce((aggr, product) => {
			if (product.origin_id === origin_id) {
				return {
					...product,
					activeDough: dough,
				};
			}
			return aggr;
		}, {} as T_pizza);

		try {
			await productsAPI.patchMenuItem(origin_id, updatedMenuProduct);
		} catch (err) {
			console.error(err);
		}
	},
);

export const fetchChangeActivePrice = createAsyncThunk(
	"products/fetchChangeActivePrice",
	async (
		{
			pizza,
			idx,
		}: {
			pizza: T_pizza;
			idx: number;
		},
		{ dispatch, getState },
	) => {
		dispatch(changeActivePriceOptimistic({ pizza, idx }));
		const { products } = getState() as RootState;
		const { origin_id } = pizza;

		const updatedMenuProduct = products.menuProducts.reduce((aggr, product) => {
			if (product.origin_id === origin_id) {
				return {
					...product,
					activePrice: idx,
				};
			}
			return aggr;
		}, {} as T_pizza);

		try {
			await productsAPI.patchMenuItem(origin_id, updatedMenuProduct);
		} catch (err) {
			console.error(err);
		}
	},
);

const initialState: productsState = {
	initialProducts: LOCAL_DATA,
	menuProducts: [],
	cartProducts: [],
	activeCategory: "",
	activeSort: "title",
	activePage: 1,
	totalPages: 2,
	menuCategories: [],
	loadingState: "loading",
};

export const productsSlice = createSlice({
	name: "products",

	initialState: initialState,

	reducers: {
		setActivePage: (state, { payload }: PayloadAction<number>) => {
			state.activePage = payload + 1;
		},
		setTotalPages: (state, { payload }: PayloadAction<number>) => {
			state.totalPages = payload;
		},
		setActiveCategory: (state, { payload }: PayloadAction<string>) => {
			state.activeCategory = payload;
			if (!payload.length) {
				state.menuProducts = state.initialProducts.slice((state.activePage - 1) * 8);
			} else {
				state.menuProducts = state.initialProducts.filter((product) =>
					product.categories.includes(payload),
				);
			}
		},
		setActiveSort: (state, { payload }: PayloadAction<string>) => {
			state.activeSort = payload;
			if (payload === "title") {
				state.menuProducts.sort((a, b) => a.title.localeCompare(b.title));
			} else if (payload === "-title") {
				state.menuProducts.sort((a, b) => b.title.localeCompare(a.title));
			} else if (payload === "prices") {
				state.menuProducts.sort((a, b) => a.prices[a.activePrice] - b.prices[b.activePrice]);
			} else if (payload === "-prices") {
				state.menuProducts.sort((a, b) => b.prices[b.activePrice] - a.prices[a.activePrice]);
			}
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
		manageCountOptimistic: (
			state,
			{ payload }: PayloadAction<{ pizza: T_cartPizza; increment: boolean }>,
		) => {
			const { pizza, increment } = payload;
			const { origin_id, cart_id, count, activePrice, price } = pizza;
			const basePrice = Number((price / count).toFixed(2));

			state.cartProducts = state.cartProducts.map((product) => {
				if (product.cart_id === cart_id) {
					return {
						...product,
						count: increment ? count + 1 : count - 1,
						price: increment
							? Number((price + basePrice).toFixed(2))
							: Number((price - basePrice).toFixed(2)),
					};
				}
				return product;
			});

			state.menuProducts = state.menuProducts.map((product) => {
				if (product.origin_id === origin_id) {
					return updateCountsAndTotalPrice(product, activePrice, increment ? true : false);
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
		builder.addCase(fetchMenuProducts.pending, (state) => {
			state.loadingState = "loading";
		});
		builder.addCase(fetchMenuProducts.fulfilled, (state, action) => {
			const { payload } = action;
			const { menu, allProducts } = payload as { menu: menuProductsPayload; allProducts: T_pizzas };

			state.loadingState = "success";
			state.initialProducts = allProducts;
			state.menuProducts = menu.items;
			state.totalPages = menu.meta.total_pages;
			state.menuCategories = [
				"All",
				...Array.from(new Set(allProducts.flatMap((pizza) => pizza.categories))),
			];
		});
		builder.addCase(fetchMenuProducts.rejected, (state) => {
			state.loadingState = "error";
			state.initialProducts = LOCAL_DATA;
			state.menuProducts = LOCAL_DATA;
			state.totalPages = LOCAL_DATA.length / 8;
			state.menuCategories = [
				"All",
				...Array.from(new Set(LOCAL_DATA.flatMap((pizza) => pizza.categories))),
			];
		});
		builder.addCase(
			fetchCartProducts.fulfilled,
			(state, { payload }: PayloadAction<T_cartPizzas>) => {
				state.cartProducts = payload;
			},
		);
		builder.addCase(fetchCartProducts.rejected, (state) => {
			state.cartProducts = [];
		});
	},
});

export const {
	setActiveCategory,
	setActiveSort,
	setActivePage,
	setTotalPages,
	addToCartOptimistic,
	changeActivePriceOptimistic,
	changeActiveDoughOptimistic,
	manageCountOptimistic,
	removeItemFromCartOptimistic,
	clearCartOptimistic,
} = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products;
export const selectActiveSort = (state: RootState) => state.products.activeSort;
export const selectMenuProducts = (state: RootState) => state.products.menuProducts;
export const selectCartProducts = (state: RootState) => state.products.cartProducts;

export default productsSlice.reducer;
