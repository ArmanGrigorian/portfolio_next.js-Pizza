import { generateIdFromParams, updateCountsAndTotalPrice } from "@/utils/helpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const productsApi = createApi({
	reducerPath: "productsApi",
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	tagTypes: ["Products"],
	endpoints: (builder) => ({
		getMenuProducts: builder.query({
			query: (params: getMenuProductsParams) => {
				const { activeCategory, activeSort, activePage } = params;
				return `/menu?&page=${activePage}&limit=8&categories=*${activeCategory}&sortBy=${activeSort}`;
			},
			providesTags: (result) =>
				result
					? [
							...result.items.map(({ id }: { id: number }) => ({ type: "Products", id } as const)),
							{ type: "Products", id: "LIST" },
					  ]
					: [{ type: "Products", id: "LIST" }],
		}),
		changeActiveDough: builder.mutation({
			query: ({
				productsState,
				pizza,
				dough,
			}: {
				productsState: productsState;
				pizza: T_pizza;
				dough: string;
			}) => {
				const { origin_id } = pizza;

				const updatedMenuProduct = productsState.menuProducts.reduce((aggr, product) => {
					if (product.origin_id === origin_id) {
						return {
							...product,
							activeDough: dough,
						};
					}
					return aggr;
				}, {});

				return {
					url: `/menu/${origin_id}`,
					method: "PATCH",
					body: updatedMenuProduct,
				};
			},
			invalidatesTags: (result) => [{ type: "Products", id: result.origin_id }],
		}),
		changeActivePrice: builder.mutation({
			query: ({
				productsState,
				pizza,
				idx,
			}: {
				productsState: productsState;
				pizza: T_pizza;
				idx: number;
			}) => {
				const { origin_id } = pizza;

				const updatedMenuProduct = productsState.menuProducts.reduce((aggr, product) => {
					if (product.origin_id === origin_id) {
						return {
							...product,
							activePrice: idx,
						};
					}
					return aggr;
				}, {});

				return {
					url: `/menu/${origin_id}`,
					method: "PATCH",
					body: updatedMenuProduct,
				};
			},
			invalidatesTags: (result) => [{ type: "Products", id: result.origin_id }],
		}),
		updateMenuProduct: builder.mutation({
			query: ({ productsState, pizza }: { productsState: productsState; pizza: T_pizza }) => {
				const { id, ...pizzaData } = pizza;
				const { origin_id, activePrice } = pizzaData;

				const updatedProduct = productsState.menuProducts.reduce((aggr, product) => {
					if (product.origin_id === origin_id) {
						return updateCountsAndTotalPrice(product, activePrice, true);
					}
					return aggr;
				}, {});

				return {
					url: `/menu/${origin_id}`,
					method: "PATCH",
					body: updatedProduct,
				};
			},
			invalidatesTags: (result) => [{ type: "Products", id: result.origin_id }],
		}),
		resetItemCount: builder.mutation({
			query: ({ menuProducts, pizza }: { menuProducts: T_pizzas; pizza: T_cartPizza }) => {
				const { origin_id, count, activePrice, price } = pizza;

				const updatedMenuProducts = menuProducts.reduce((aggr, product) => {
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
				}, {});

				return {
					url: `/menu/${origin_id}`,
					method: "PATCH",
					body: updatedMenuProducts,
				};
			},
			invalidatesTags: (result) => [{ type: "Products", id: result.origin_id }],
		}),
		incrementCountInMenu: builder.mutation({
			query: ({ menuProducts, pizza }: { menuProducts: T_pizzas; pizza: T_cartPizza }) => {
				const { origin_id, activePrice } = pizza;

				const updatedMenuProduct = menuProducts.reduce((aggr, product) => {
					if (product.origin_id === origin_id) {
						return updateCountsAndTotalPrice(product, activePrice, true);
					}
					return aggr;
				}, {});

				return {
					url: `/menu/${origin_id}`,
					method: "PATCH",
					body: updatedMenuProduct,
				};
			},
			invalidatesTags: (result) => [{ type: "Products", id: result.origin_id }],
		}),
		decrementCountInMenu: builder.mutation({
			query: ({ menuProducts, pizza }: { menuProducts: T_pizzas; pizza: T_cartPizza }) => {
				const { origin_id, count, activePrice } = pizza;

				const updatedMenuProduct = menuProducts.reduce((aggr, product) => {
					if (product.origin_id === origin_id) {
						return updateCountsAndTotalPrice(product, activePrice, false);
					}
					return aggr;
				}, {});

				return {
					url: `/menu/${origin_id}`,
					method: "PATCH",
					body: updatedMenuProduct,
				};
			},
			invalidatesTags: (result) => [{ type: "Products", id: result.cart_id }],
		}),
		addToCart: builder.mutation({
			query: ({
				productsState,
				pizza,
				actual_id,
			}: {
				productsState: productsState;
				pizza: T_pizza;
				actual_id: number;
			}) => {
				const { id, categories, counts, doughs, prices, sizes, totalPrice, ...pizzaData } = pizza;
				const { activePrice } = pizzaData;

				const newCartProduct: T_cartPizza = {
					...pizzaData,
					count: counts[activePrice],
					price: Number(prices[activePrice].toFixed(2)),
					activeSize: sizes[activePrice],
				};

				const search = productsState.cartProducts.find(
					(product) =>
						product.title === newCartProduct.title &&
						product.activeDough === newCartProduct.activeDough &&
						product.activeSize === newCartProduct.activeSize,
				);

				if (search) {
					const newCartItem = productsState.cartProducts.reduce((aggr, product) => {
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

					return {
						url: `/cart/${actual_id}`,
						method: "PATCH",
						body: newCartItem,
					};
				} else {
					return {
						url: `/cart/`,
						method: "POST",
						body: {
							...newCartProduct,
							cart_id: generateIdFromParams(newCartProduct),
							count: 1,
						},
					};
				}
			},
			invalidatesTags: (result) => [{ type: "Products", id: result.cart_id }],
		}),
		clearCart: builder.mutation({
			query: () => ({
				url: `/cart`,
				method: "PATCH",
				body: [],
			}),
			invalidatesTags: (result) => [{ type: "Products", id: result.cart_id }],
		}),
		resetCounts: builder.mutation({
			query: (menuProducts: T_pizzas) => {
				const updatedMenuProducts = menuProducts.map((product) => {
					return {
						...product,
						counts: product.counts.map((val) => (val = 0)),
						totalPrice: 0,
					};
				});

				console.log(updatedMenuProducts);

				return {
					url: `/menu`,
					method: "PATCH",
					body: updatedMenuProducts,
				};
			},
			invalidatesTags: (result) => [{ type: "Products", id: result.origin_id }],
		}),
		removeItemFromCart: builder.mutation({
			query: ({ cartProducts, pizza }: { cartProducts: T_cartPizzas; pizza: T_cartPizza }) => {
				const { cart_id } = pizza;

				const updatedCartProducts = cartProducts.filter((product) => product.cart_id !== cart_id);

				return {
					url: `/cart`,
					method: "PATCH",
					body: updatedCartProducts,
				};
			},
			invalidatesTags: (result) => [{ type: "Products", id: result.cart_id }],
		}),
		incrementCountInCart: builder.mutation({
			query: ({
				cartProducts,
				pizza,
				actual_id,
			}: {
				cartProducts: T_cartPizzas;
				pizza: T_cartPizza;
				actual_id: number;
			}) => {
				const { cart_id, count, price } = pizza;
				const basePrice = Number((price / count).toFixed(2));

				const updatedCartProduct = cartProducts.reduce((aggr, product) => {
					if (product.cart_id === cart_id) {
						return {
							...product,
							count: count + 1,
							price: Number((price + basePrice).toFixed(2)),
						};
					}
					return aggr;
				}, {});

				return {
					url: `/cart/${actual_id}`,
					method: "PATCH",
					body: updatedCartProduct,
				};
			},
			invalidatesTags: (result) => [{ type: "Products", id: result.cart_id }],
		}),
		decrementCountInCart: builder.mutation({
			query: ({
				cartProducts,
				pizza,
				actual_id,
			}: {
				cartProducts: T_cartPizzas;
				pizza: T_cartPizza;
				actual_id: number;
			}) => {
				const { cart_id, count, price } = pizza;
				const basePrice = Number((price / count).toFixed(2));

				const updatedCartProduct = cartProducts.reduce((aggr, product) => {
					if (product.cart_id === cart_id) {
						return {
							...product,
							count: count + 1,
							price: Number((price - basePrice).toFixed(2)),
						};
					}
					return aggr;
				}, {});

				return {
					url: `/cart/${actual_id}`,
					method: "PATCH",
					body: updatedCartProduct,
				};
			},
			invalidatesTags: (result) => [{ type: "Products", id: result.cart_id }],
		}),
	}),
});

export const {
	useGetMenuProductsQuery,
	useChangeActiveDoughMutation,
	useChangeActivePriceMutation,
	useUpdateMenuProductMutation,
	useResetCountsMutation,
	useResetItemCountMutation,
	useAddToCartMutation,
	useClearCartMutation,
	useRemoveItemFromCartMutation,
	useIncrementCountInMenuMutation,
	useDecrementCountInMenuMutation,
	useIncrementCountInCartMutation,
	useDecrementCountInCartMutation,
} = productsApi;
