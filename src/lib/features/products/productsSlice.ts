import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

import { LOCAL_DATA } from "../../../../DATA";

const initialState: productsState = {
	menuProducts: LOCAL_DATA.menu,
	cartProducts: LOCAL_DATA.cart,
};

export const productsSlice = createSlice({
	name: "products",

	initialState: initialState,

	reducers: {},
});

export const {} = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products;
export const selectMenuProducts = (state: RootState) => state.products.menuProducts;
export const selectCartProducts = (state: RootState) => state.products.cartProducts;

export default productsSlice.reducer;
